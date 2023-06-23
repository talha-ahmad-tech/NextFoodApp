import CustomDropdown from '../CustomDropdown';
import ExportIcon from '../Svgs/ExportIcon';
import Action from '../Svgs/Actions';
import Download from '../Svgs/Download';
import ExcelImport from '../Svgs/ExcelImport';
import { useContext } from 'react';
import {
  GridContext,
  ImportExportContext,
  SetImportExportContext,
} from '../Context/ImportExportContext';

const ImportExportFiles = ({
  notImportAble = false,
}: {
  notImportAble?: boolean;
}) => {
  const context = useContext(ImportExportContext);
  const refFromContext = useContext(GridContext);
  const setContext = useContext(SetImportExportContext);

  const tableactionsWithImport = [
    {
      name: 'Export to Excel',
      icon: <ExportIcon />,
      onClick: () => {
        const params = {
          suppressQuotes: true,
          fileName: `${Date.now()}.csv`,
        };
        refFromContext?.current?.api?.exportDataAsCsv(params);
      },
    },
    { name: 'Download Excel Format', icon: <Download />, onClick: () => 0 },
    {
      name: 'Import from Excel',
      icon: <ExcelImport />,
      onClick: () => {
        if (setContext) {
          setContext({
            ...context,
            isModalOpen: true,
          });
        }
      },
    },
  ];

  const tableactionsWithoutImport = [
    {
      name: 'Export to Excel',
      icon: <ExportIcon />,
      onClick: () => {
        const params = {
          suppressQuotes: true,
          fileName: `${Date.now()}.csv`,
        };
        refFromContext?.current?.api?.exportDataAsCsv(params);
      },
    },
  ];
  return (
    <CustomDropdown
      className="custom-grey-outline-btn no-icon"
      items={notImportAble ? tableactionsWithoutImport : tableactionsWithImport}
      icon={<Action />}
    />
  );
};

export default ImportExportFiles;
