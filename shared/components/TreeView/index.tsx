import ListHeaderWrapper from "../ListHeaderWrapper";
import SectionWrapper from "../SectionWrapper";
import "./styles.scss";

interface ItreeView {
  toggleTitleTab?: string;
  toggleTitle?: any;
  showToggle?: boolean;
  listTitle?: string;
}

const TreeView = ({
  toggleTitle = "",
  toggleTitleTab = "",
  showToggle = false,
  listTitle = "",
}: ItreeView) => {
  return (
    <>
      {listTitle && (
        <ListHeaderWrapper
          toggleTitleTab={toggleTitleTab}
          toggleTitle={toggleTitle}
          title={listTitle}
          showToggleButton={showToggle}
        />
      )}
      <SectionWrapper>
        <ul className="custom-tree-vertical">
          <li>
            <div>Friday Electronics</div>
            <ul>
              <li>
                <div>Regional South</div>
                <ul>
                  <li>
                    <div>Territory S-1</div>
                    <ul>
                      <li>
                        <div>Lahore</div>
                      </li>
                      <li>
                        <div>Gujranwala</div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>Territory S-2</div>
                    <ul>
                      <li>
                        <div>Faisalabad</div>
                      </li>
                      <li>
                        <div>Sargodha</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <div>Regional Central</div>
                <ul>
                  <li>
                    <div>Territory C-1</div>
                    <ul>
                      <li>
                        <div>Isalamabad</div>
                      </li>
                      <li>
                        <div>Rawalpindi</div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>Territory C-2</div>
                    <ul>
                      <li>
                        <div>Taxila</div>
                      </li>
                      <li>
                        <div>Murree</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <div>Regional North</div>
                <ul>
                  <li>
                    <div>Territory N-1</div>
                    <ul>
                      <li>
                        <div>Multan</div>
                      </li>
                      <li>
                        <div>D.G Khan</div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <div>Territory N-2</div>
                    <ul>
                      <li>
                        <div>Bahawalpur</div>
                      </li>
                      <li>
                        <div>Sadiq Abad</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </SectionWrapper>
    </>
  );
};

export default TreeView;
