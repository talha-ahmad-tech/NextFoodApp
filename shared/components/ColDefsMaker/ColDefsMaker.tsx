import moment from "moment";

export const ColDefsMaker = (data: any, action?: any) => {
  let cols = [] as any;
  const cellRenderers = (value?: any, keys?: any) => {
    const formats = "SSSSSS" || "SSSSSSS";
    if (value === true) {
      return {
        cellRenderer: ({ data }: any) => {
          return data[keys] ? "Yes" : "No";
        },
      };
    }
    if (
      value &&
      (moment(value, "YYYY-MM-DDTHH:mm:ssZ", true).isValid() ||
        moment(value, `YYYY-MM-DDTHH:mm:ss.${formats}Z`, true).isValid())
    ) {
      return {
        cellRenderer: ({ data }: any) => {
          return moment(data[keys]).format("YYYY/MM/DD") ?? "";
        },
      };
    } else {
      if (value === true || value === false) {
        return {
          cellRenderer: ({ data }: any) => {
            return data[keys] ? "Yes" : "No";
          },
        };
      }
    }
  };
  if (Object.keys(data)?.length) {
    for (const [keys, value] of Object.entries(data)) {
      if (keys === "varientValueDetails") {
        cols.push(
          {
            headerName: "Color",
            field: "color",
            filter: false,
            cellRenderer: ({ data }: any) => {
              return data?.varientValueDetails?.color?.color ?? "";
            },
          },
          {
            headerName: "Size",
            field: "size",
            filter: false,
            cellRenderer: ({ data }: any) => {
              return data?.varientValueDetails?.size?.size ?? "";
            },
          },
          {
            headerName: "Style",
            field: "style",
            filter: false,
            cellRenderer: ({ data }: any) => {
              return data?.varientValueDetails?.style?.style ?? "";
            },
          }
        );
      } else {
        if (
          Array.isArray(value) ||
          keys.includes("Id") ||
          keys.includes("id")
        ) {
          continue;
        } else {
          const result = keys.replace(/([A-Z])/g, " $1");
          const headers = result.charAt(0).toUpperCase() + result.slice(1);
          const header = headers.includes("String")
            ? headers.split("String")[0]
            : headers;
          cols.push({
            headerName: header === "Descr" ? "Description" : header,
            field: keys,
            ...cellRenderers(value, keys),
          });
        }
      }
    }
  }

  return cols;
};
