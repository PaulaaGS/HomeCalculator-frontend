import { Category } from '../enums/category';

type CategoryObj = {
    [key in Category]: string;
};

const CategoryLabel: CategoryObj = {
    main: 'Główna',
    lighting: 'Oświetlenie',
    bathroom: 'Łazienka',
    kitchen: 'Kuchnia',
    appliances: 'RTV i AGD',
    furniture: 'Meble',
    others: 'Inne',
};

export const getCategoryLabel = (category: Category) => {
    return CategoryLabel[category];
};
