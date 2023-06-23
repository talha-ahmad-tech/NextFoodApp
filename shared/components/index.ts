import ButtonWrapper from './ButtonWrapper';
/* PLOP_INJECT_IMPORT */
import Layout from './Layout';
import { ColDefsMaker } from './ColDefsMaker/ColDefsMaker';
import ViewItem from './ViewItem/ViewItem';
import PaymentSchedule from './PaymentSchedule/PaymentSchedule';
import NewSalesTaxGroup from './NewSalesTaxGroup/NewSalesTaxGroup';
import Summary from './Summary/Summary';
import PurchaseOrder from './PurchaseOrder/PurchaseOrder';
import Megamenu from './Megamenu/Megamenu';
import Aside from './Aside/Aside';
import Header from './Header/Header';
import AgGrid from './AgGrid';
import QuickListView from './QuickListView/QuickListView';
// import { Toaster } from "./Alert/ToasterComponent";
import StatsSubHeader from './StatsSubHeader/StatsSubHeader';
import TabsHeader from './TabsDetail/TabsHeader';
import TabsContent from './TabsDetail/TabsContent';
import ListingHeaderBar from './ListingHeaderBar';
import IconButton from '@fridayfood/ui-toolkit/src/Button/IconButton';
import DeleteButton from '@fridayfood/ui-toolkit/src/Button/DeleteButton';
import EditButton from '@fridayfood/ui-toolkit/src/Button/EditButton';
import TableGrid from './AgGrid/clientGrid';
import SinglePageMenu from './Megamenu';
import CustomAlert from './CustomAlert';
import {
  getQueryParam,
  setQueryParams,
  deleteQueryParams,
} from './utils/queryManipulation';
import { Toaster, alertService, AlertType } from './Alert';
import Spinner from './Spinner/Spinner';
import useOutsideAlerter from './CustomHooks';
import useEffectAfterMount from './hooks/useEffectAfterMount';
import TabSteps from './Steps';
import FormFooterActions from './FromFooterAction';
import Card from './Card';
import AgGridForm from './AgGridForm';
import { AgGridSelectEditor } from './AgGridForm/Components/AgGridSelectEditor';
import LinesModal from './LineModal';
import LinesModalSingle from './LineModalSingle';
import InProgress from './WorkInProgress';
import Tree from './Tree';
import RectangleButton from './RectangleButton';
import ToggleHandler from './ToggleHandler';

/* NEW UI IMPRTS */
import LineHeader from './LineHeader';
import SectionWrapper from './SectionWrapper';
import ListWrapper from './ListWrapper';
import MainHeader from './MainHeader';
import CardHeaderIConText from './CardHeaderIconText';
import NoItem from './NoItems';
import NoRecordWrapper from './NoRecordWrapper';
import CustomDropdown from './CustomDropdown';
import ListHeaderWrapper from './ListHeaderWrapper';
import ModuleDashboardCard from './ModuleDashboardCard';
import GeneralView from './GeneralView';
import TabsListing from './TabListing';
import Tabs from './TabsDetail';
import ChatButton from './ChatButton';
import GeneralListing from './GeneralListing';
import ToggleListing from './ToggleListing';
import CardWrapper from './CardWrapper';
import CardWithImage from './CardWithImage';
import CardHorizentalImage from './CardHorizentalImage';
import PaginatedComponent from './PaginatedComponent';
import Footer from './Footer';
import {
  ToggleProvider,
  ToggleContext,
  ToggleDispatchContext,
  AllLinesContext,
  SetAllLinesContext,
} from './Context/ToggleContext';
import {
  VendorQuotationProvider,
  HeaderContext,
  SetHeaderContext,
} from './Context/VendorQuotationContext';
import {
  ProductsProvider,
  ProductsContext,
  ProductsDispatchContext,
} from './Context/ProductsContext';
import {
  InventoryProvider,
  InventoryContext,
  InventoryDispatchContext,
} from './Context/InventoryContext';
import {
  FiltersContext,
  SetFiltersContext,
  FiltersProvider,
} from './Context/FiltersContext';

import {
  FiltersListContext,
  SetFiltersListContext,
  FiltersListProvider,
} from './Context/FiltersListContext ';

import { Icon } from './Icon';
import { WorkspaceCard } from './WorkspaceCard';
import ListWrapperMain from './ListWrapperMain';
import HeaderWithButton from './HeaderWithButton';
import TabsVertical from './TabsVertical';
import Workspace from './Workspace';
import FavWrapper from './FavWrapper';
import ChartsWrapper from './ChartsWrapper';
import HeaderTextButton from './HeaderTextButton';
import AgGridGeneric from './AgGridForm/AgGridGeneric';
import {
  QuickViewContext,
  QuickViewDispatchContext,
  QuickViewProvider,
} from './Context/QuickViewContext';
import ReportFilters from './ReportFilters';
import {
  ModalContext,
  ModalProvider,
  ModalDispatchContext,
} from './Context/ModalContext';
import { CollapseWrapper } from './CollapseWrapper';
import FilterHeader from './FilterHeader';

import TreeView from './TreeView';
import LineSwitch from './LineSwitch';

import CustomFieldComponent from './CustomFieldComponent/CustomFieldComponent';
import UplaodImage from './UploadImage';
const ProductSubTypeEnum: any = {
  1: 'Product',
  2: 'BOM',
  3: 'Bundle',
  4: 'KIT',
};

const DiscountGroupTypes: any = {
  1: 'Product',
  2: 'Customer',
  3: 'Vendor',
  4: 'Store',
};

const TOGGLE_OPTIONS: {
  header: number;
  lines: number;
} = {
  header: 0,
  lines: 1,
};
const MODAL_OPTIONS: {
  active: boolean;
  inActive: boolean;
} = {
  active: true,
  inActive: false,
};

export {
  /* PLOP_INJECT_EXPORT */
  CustomFieldComponent,
  getQueryParam,
  setQueryParams,
  deleteQueryParams,
  LineHeader,
  Layout,
  ViewItem,
  PaymentSchedule,
  NewSalesTaxGroup,
  Summary,
  PurchaseOrder,
  Megamenu,
  Aside,
  ButtonWrapper,
  Header,
  AgGrid,
  Toaster,
  alertService,
  AlertType,
  StatsSubHeader,
  TabsHeader,
  TabsContent,
  ListingHeaderBar,
  IconButton,
  DeleteButton,
  EditButton,
  TableGrid,
  SinglePageMenu,
  CustomAlert,
  Spinner,
  useOutsideAlerter,
  TabSteps,
  FormFooterActions,
  Card,
  AgGridForm,
  LinesModal,
  LinesModalSingle,
  InProgress,
  Tree,
  RectangleButton,
  ProductSubTypeEnum,
  useEffectAfterMount,
  DiscountGroupTypes,
  SectionWrapper,
  ListWrapper,
  MainHeader,
  CardHeaderIConText,
  NoItem,
  ListHeaderWrapper,
  ModuleDashboardCard,
  CustomDropdown,
  NoRecordWrapper,
  TOGGLE_OPTIONS,
  GeneralView,
  Tabs,
  ChatButton,
  GeneralListing,
  CardWrapper,
  CardWithImage,
  CardHorizentalImage,
  Footer,
  Icon,
  WorkspaceCard,
  ListWrapperMain,
  FavWrapper,
  ChartsWrapper,
  HeaderTextButton,
  AgGridGeneric,
  ReportFilters,
  QuickListView,
  CollapseWrapper,

  /*Context*/
  ToggleProvider,
  ToggleContext,
  ToggleDispatchContext,
  AllLinesContext,
  SetAllLinesContext,
  ToggleHandler,
  QuickViewContext,
  QuickViewDispatchContext,
  QuickViewProvider,
  HeaderWithButton,
  TabsVertical,
  MODAL_OPTIONS,
  ModalContext,
  ModalProvider,
  ModalDispatchContext,

  /* mock component */
  Workspace,
  ColDefsMaker,
  ToggleListing,
  /* Aggrid Editor */
  AgGridSelectEditor,
  VendorQuotationProvider,
  HeaderContext,
  SetHeaderContext,
  ProductsProvider,
  ProductsContext,
  ProductsDispatchContext,
  FiltersContext,
  SetFiltersContext,
  FiltersProvider,
  FiltersListContext,
  SetFiltersListContext,
  FiltersListProvider,
  TreeView,
  TabsListing,
  LineSwitch,
  UplaodImage,
  FilterHeader,
  PaginatedComponent,
  InventoryProvider,
  InventoryContext,
  InventoryDispatchContext,
};
