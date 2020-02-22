import * as bigInt from 'big-integer';

export class LayoutString {
    private readonly TABLE = "ABCDEFGHIJKLMNOPQRSTUWVXYZabcdefghijklmnopqrstuwvxyz0123456789-_";
    private readonly REV_TABLE: Map<string, number> = new Map<string, number>();
    private readonly PICKUP_SIZES = Array(100).fill(36);
    private readonly PICKUP_SIZES_2 = Array(100).fill(37);
    private readonly ELEVATOR_SIZES = Array(20).fill(20).concat([21]);

    constructor() {
        for (let i = 0; i < this.TABLE.length; i++) {
            this.REV_TABLE.set(this.TABLE[i], i);
        }
    }

    compute_checksum(checksum_size, layout_number) {
        if (checksum_size == 0) {
            return 0;
        }
        let s = 0;
        while (layout_number.greater(0)) {
            const divmod = layout_number.divmod(1 << checksum_size);
            s = (s + divmod.remainder) % (1 << checksum_size);
            layout_number = divmod.quotient;
        }
        return s;
    }

    encode_layout(pickup_layout, elevator_layout) {
        let elevator_string;
        if (elevator_layout === undefined) {
            elevator_string = "qzoCAr2fwehJmRjM"
        } else {
            elevator_string = this.encode_layout_inner(this.ELEVATOR_SIZES, 91, 5, elevator_layout);
        }

        let pickup_string;
        if (pickup_layout.indexOf("36") == -1) {
            pickup_string = this.encode_layout_inner(this.PICKUP_SIZES, 517, 5, pickup_layout);
        } else {
            pickup_string = "!" + this.encode_layout_inner(this.PICKUP_SIZES_2, 521, 1, pickup_layout);
        }

        if (elevator_string != "qzoCAr2fwehJmRjM") {
            return elevator_string + "." + pickup_string;
        } else {
            return pickup_string;
        }
    }

    encode_layout_inner(sizes, layout_data_size, checksum_size, layout) {
        let num = bigInt(0);
        layout.forEach(function (item_type, i) {
            num = num.times(sizes[i]).plus(item_type);
        });

        const checksum = this.compute_checksum(checksum_size, num);
        num = num.plus(bigInt(checksum).shiftLeft(layout_data_size));

        const even_bits = [];
        const odd_bits = [];
        let all_bits: any = num.toString(2);
        for (let i = 0; i < all_bits.length; i++) {
            if (i % 2) {
                odd_bits.push(all_bits[i]);
            } else {
                even_bits.push(all_bits[i]);
            }
        }

        odd_bits.reverse();
        all_bits = [];
        for (let i = 0; i < even_bits.length; i++) {
            all_bits.push(even_bits[i]);
            all_bits.push(odd_bits[i]);
        }
        num = bigInt(all_bits.join(""), 2)

        let s = '';
        for (let i = 0; i < layout_data_size / 6; i++) {
            const divmod: any = num.divmod(64);
            num = divmod.quotient;

            s = s + this.TABLE[divmod.remainder];
        }

        return s;
    }

    decode_layout(layout_string) {
        let pickup_layout, elevator_layout, has_scan_visor;
        if (layout_string.includes('.')) {
            [elevator_layout, pickup_layout] = layout_string.split('.');
            if (elevator_layout.length != 16) {
                return "Invalid layout: incorrect length for the section before '.', not 16 characters";
            }
        } else {
            pickup_layout = layout_string;
            has_scan_visor = pickup_layout[0] == '!';
            elevator_layout = "qzoCAr2fwehJmRjM";
        }

        has_scan_visor = false;
        if (pickup_layout[0] == '!') {
            has_scan_visor = true;
            pickup_layout = pickup_layout.substring(1);
        }

        if (pickup_layout.length != 87) {
            return "Invalid layout: incorrect length for the section after '.', not 87 characters";
        }

        const el = this.decode_layout_inner(this.ELEVATOR_SIZES, 91, 5, elevator_layout);
        if (typeof el === "string") {
            return el;
        }

        let pl;
        if (has_scan_visor) {
            pl = this.decode_layout_inner(this.PICKUP_SIZES_2, 521, 1, pickup_layout);
        } else {
            pl = this.decode_layout_inner(this.PICKUP_SIZES, 517, 5, pickup_layout);
        }
        if (typeof pl === "string") {
            return pl;
        }
        return [el, pl];
    }

    decode_layout_inner(sizes, layout_data_size, checksum_size, layout_string) {
        let num = bigInt(0);
        for (let i = layout_string.length - 1; i >= 0; i--) {
            num = num.shiftLeft(6).plus(this.REV_TABLE.get(layout_string[i]));
        }

        const even_bits = [];
        const odd_bits = [];
        let all_bits: any = num.toString(2);
        for (let i = 0; i < all_bits.length; i++) {
            if (i % 2) {
                odd_bits.push(all_bits[i]);
            } else {
                even_bits.push(all_bits[i]);
            }
        }

        odd_bits.reverse();
        all_bits = []
        for (let i = 0; i < even_bits.length; i++) {
            all_bits.push(even_bits[i]);
            all_bits.push(odd_bits[i]);
        }
        num = bigInt(all_bits.join(""), 2)

        let checksum_value: any = num.shiftRight(layout_data_size);
        num = num.minus(checksum_value.shiftLeft(layout_data_size));
        checksum_value = checksum_value.toJSNumber();
        if (checksum_value != this.compute_checksum(checksum_size, num)) {
            return 'Invalid layout: checksum failed';
        }

        const layout = [];
        sizes = sizes.slice().reverse();
        sizes.forEach(function (denum) {
            const divmod = num.divmod(denum);
            layout.push(divmod.remainder.toJSNumber());
            num = divmod.quotient;
        });

        layout.reverse();
        return layout;
    }
}
