export function addCommas(number: any) {
    // Convert the number to a string and use a regular expression to add commas
    return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatRupee(number: number) {
    // Convert number to string
    let strNumber = String(number);

    // Split the number into integer and decimal parts
    let parts = strNumber?.split('.');
    let integerPart = parts?.[0];
    let decimalPart = parts?.length > 1 ? '.' + parts?.[1] : '';

    // Add commas for thousands separator
    integerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // can be add ₹ symbol and return formatted number
    return integerPart + decimalPart;
}

export default function formatFees(amount: number) {
    if (amount >= 100000) {
        return `${(amount / 100000)?.toFixed(2)} Lac`;
    } else if (amount >= 1000) {
        return `${(amount / 1000)?.toFixed(2)} K`;
    } else {
        return `${amount}`;
    }
}

export function formatDate(dateString: string | number | Date) {
    if (!dateString) return "";
    const options: any = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString)?.toLocaleDateString("en-US", options);
};

export function getDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getFullYear(); // Returns the year (e.g., 2024)
    const month = (date.getMonth() + 1)?.toString()?.padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');

    return (`${day}-${month}-${year}`);
}

export function formatTime(isoString: string) {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
} //  // Output: "07:15 PM"

export function convertQueryDataToTabSections(queryData: any): any {
    const tabSectionsMap: { [key: string]: any } = {};

    // Iterate over each item in queryData
    queryData.forEach((item: any) => {
        const navItem = item?.navItem?.data?.attributes?.navItem;
        if (!navItem) {
            // Skip this item if it doesn't contain navItem
            return;
        }

        const { navItem: _, ...sectionData } = item;

        // Initialize the navItem in the map if it doesn't exist
        if (!tabSectionsMap[navItem]) {
            tabSectionsMap[navItem] = { navItem: navItem, sections: [] };
        }

        // Add the section data to the respective navItem's sections array
        tabSectionsMap[navItem].sections.push(sectionData);
    });

    // Convert the map to an array
    return Object.values(tabSectionsMap);
}

export function convertToYearlyFee(courseFee: any, courseFeeLabel: any) {
    switch (courseFeeLabel) {
        case 'monthly':
            return courseFee * 12;
        case 'weekly':
            return courseFee * 52;
        case 'daily':
            return courseFee * 365;
        default: // yearly
            return courseFee;
    }
}

export function discountedAmount(data: number, discount: number) {
    return Math.floor(data - ((data * discount) / 100));
}


// --------------------------------------------------------------------------- //
export function isValidUrl(url: string) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(url);
}
// Examples
// console.log(isValidUrl('https://www.example.com')); // true
// console.log(isValidUrl('ftp://example.com')); // false, if you want to include ftp change the pattern
// console.log(isValidUrl('http://localhost:8080')); // true
// console.log(isValidUrl('not-a-url')); // false
// --------------------------------------------------------------------------- //