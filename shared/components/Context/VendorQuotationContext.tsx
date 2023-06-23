import { createContext, useState } from "react";

const HeaderContext = createContext<any>({});
const SetHeaderContext = createContext<any>({});

const VendorQuotationProvider = ({ children }: any) => {
  const [header, setHeader] = useState<any>({
    id: 0,
    status: 0,
    statusDescription: "",
    vendorId: "",
    dueDate: "",
    requesterId: 0,
    deliveryDate: "",
    total: 0,
    attachmentUrl: "",
    tenantId: 0,
    comments: "",
    quantity: 0,
    requestForQuotationId: "",
    requesterData: {},
    vendorResponseDetails: [{}] as any,
  });
  return (
    <HeaderContext.Provider value={header}>
      <SetHeaderContext.Provider value={setHeader}>
        {children}
      </SetHeaderContext.Provider>
    </HeaderContext.Provider>
  );
};

export { HeaderContext, SetHeaderContext, VendorQuotationProvider };
