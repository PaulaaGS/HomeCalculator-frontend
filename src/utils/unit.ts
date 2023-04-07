import { Unit } from '../enums/unit';

type UnitObj = {
    [key in Unit]: string;
};

const unitLabel: UnitObj = {
    piece: 'szt.',
    meter: 'm',
    squareMeter: 'm²',
    cubicMeter: 'm³',
    liter: 'l',
    gram: 'g',
    kilo: 'kg',
};

export const getUnitLabel = (unit: Unit) => {
    return unitLabel[unit];
};
