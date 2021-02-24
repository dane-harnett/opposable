import * as React from "react";
import { useContext } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SelectionContext from "./SelectionContext";
import TemplateContext, { ISchemaItem } from "./TemplateContext";
import IComponent from "./types/IComponent";
import ImageInspectorItem from "./widgets/Image/InspectorItem";
import TemplateItemInspectorItem from "./widgets/TemplateItem/InspectorItem";
import TextBoxInspectorItem from "./widgets/TextBox/InspectorItem";

const useStyles = makeStyles((theme) => ({
  inspector: {
    backgroundColor: "#ffffff",
    boxShadow: "-5px 0 5px -5px #333",
    padding: 16,
    position: "fixed",
    overflowY: "scroll",
    height: "calc(100vh - 80px)",
    maxWidth: 320,
    bottom: 0,
    right: 0,
    width: 320,
    zIndex: 1300,
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formControl: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  textField: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  accordionDetails: {
    flexDirection: "column",
  },
}));

const Inspector = () => {
  const { selectedComponentIndex, setSelectedComponentIndex } = useContext(
    SelectionContext
  );
  const { template, setField } = useContext(TemplateContext);
  const classes = useStyles();

  const inspectorItemMap = {
    IMAGE: ImageInspectorItem,
    TEMPLATE_ITEM: TemplateItemInspectorItem,
    TEXT_BOX: TextBoxInspectorItem,
  };

  return (
    <div className={classes.inspector}>
      <Typography variant="h5">Inspector</Typography>
      <form className={classes.form}>
        {(template?.Schema?.length || 0) > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Template variables</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              {template?.Schema?.map(
                (schemaItem: ISchemaItem, index: number) => (
                  <React.Fragment key={index}>
                    <TextField
                      className={classes.textField}
                      label={schemaItem.label}
                      variant="outlined"
                      value={template?.data[schemaItem.name]}
                      onChange={(evt) =>
                        setField(schemaItem.name, evt.target.value)
                      }
                    />
                  </React.Fragment>
                )
              )}
            </AccordionDetails>
          </Accordion>
        )}
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Components</Typography>
          </AccordionSummary>
          <AccordionDetails className={classes.accordionDetails}>
            <div>
              {template?.components.map(
                (comp: IComponent, compIndex: number) => {
                  const InspItem = inspectorItemMap[comp.type];
                  if (!InspItem) {
                    return null;
                  }
                  return (
                    <InspItem
                      comp={comp}
                      compIndex={compIndex}
                      key={compIndex}
                    />
                  );
                }
              )}
            </div>
          </AccordionDetails>
        </Accordion>
      </form>
    </div>
  );
};

export default Inspector;
