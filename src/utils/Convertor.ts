// function groups an array of objects by a specified key, returning an object where
//  each key is a unique value from the array's key and the corresponding value is 
// an array of objects that share that key.
type AnyObject = { [key: string]: any };
function groupByKey<T extends AnyObject>(array: T[], key: keyof T): Record<string, T[]> {
    if (!Array.isArray(array)) {
        throw new Error("The first argument must be an array.");
    }
    if (array.length === 0) {
        return {};
    }

    return array.reduce((result, item) => {
        if (item[key] === undefined) {
            throw new Error(`The key "${String(key)}" is missing in an object.`);
        }

        const groupKey = String(item[key]);
        const newItem = { ...item };
        delete newItem[key];

        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(newItem);

        return result;
    }, {} as Record<string, T[]>);
}

// Usage example
// const categories = [
//     { id: "9", masterCategory: "Cybersecurity", name: "Cyber Fraud" },
//     { id: "10", masterCategory: "Cybersecurity", name: "Data Security" },
//     { id: "11", masterCategory: "Forensics", name: "Digital Forensics" }
// ];

// {
//     Cybersecurity: [
//       { id: "9", name: "Cyber Fraud" },
//       { id: "10", name: "Data Security" }
//     ],
//     Forensics: [
//       { id: "11", name: "Digital Forensics" }
//     ]
//   }
// const grouped = groupByKey(categories, "masterCategory");
// console.log(grouped);
// ----------------------------------------------------------------------------- //


type ExternalHeader = {
    id: string;
    name: string;
    groupName?: {
      id?: string;
      name?: string;
    };
    slug?: string;
  };
  
  type ResultArray = {
    id: number;
    label: string;
    href: string;
    subNav: {
      id: number;
      label: string;
      href: string;
    }[];
  }[];
  
  export const ArrayConvertor = (externalHeader: ExternalHeader[]): ResultArray => {
    if (!Array.isArray(externalHeader) || externalHeader.length === 0) {
      return []; // Handle empty or invalid input
    }
  
    const groupMap: Record<string, { label: string; subNav: { id: number; label: string; href: string }[] }> = {};
    let subNavCounter = 1;
  
    externalHeader.forEach((item, index) => {
      const groupId = item.groupName?.id;
      const groupLabel = item.groupName?.name;
      const { name, slug } = item;
  
      // Skip invalid items
      if (!groupId || !groupLabel || !name || !slug) {
        console.warn(`Skipping invalid entry at index ${index}`, item);
        return;
      }
  
      // Create group if it doesn't exist
      if (!groupMap[groupId]) {
        groupMap[groupId] = { label: groupLabel, subNav: [] };
      }
  
      // Add sub-navigation item
      groupMap[groupId].subNav.push({
        id: subNavCounter++,
        label: name,
        href: `/services/${slug}`,
      });
    });
  
    // Convert group map to result array
    return Object.values(groupMap).map((group, index) => ({
      id: index + 1,
      label: group.label,
      href: "#", // Default href for group labels
      subNav: group.subNav,
    }));
  };
  
//   // Example Usage
//   const externalHeader = [
//     {
//       id: "5",
//       name: "Corporate Fraud",
//       groupName: {
//         id: "23d366f0-87b4-45a9-a513-52ad7a05878b",
//         name: "Cyber & Digital Fraud",
//       },
//       slug: "corporate-fraud",
//     },
//   ];
  
//   const resultArray = convertToResultArray(externalHeader);
//   console.log(resultArray);
  