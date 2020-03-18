import { Field, Form, Formik } from "formik";
import React from "react";
import {
  Button,
  FormFeedback,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import * as Yup from "yup";
import "./index.css";
import { GalleryContextConsumer } from "../../services/Gallery";
import { useHistory } from "react-router-dom";
import config from "../../config";

const searchQueryWarning = "Please search for a meaningful experience.";
const searchValidationSchema = Yup.object().shape({
  searchQuery: Yup.string()
    .min(1, searchQueryWarning)
    .required(searchQueryWarning)
});

const SearchInput: React.FC<any> = ({
  field,
  form: { touched, errors },
  ...props
}) => (
  <FormGroup id="search-form-group">
    <InputGroup>
      <Input
        {...props}
        {...field}
        invalid={Boolean(touched[field.name] && errors[field.name])}
      />

      <InputGroupAddon addonType="append">
        <Button color="info">Search</Button>
      </InputGroupAddon>
      {touched["searchQuery"] && errors["searchQuery"] ? (
        <FormFeedback tooltip>{errors["searchQuery"]}</FormFeedback>
      ) : null}
    </InputGroup>
  </FormGroup>
);

const Search: React.FC = () => {
  const history = useHistory();
  return (
    <GalleryContextConsumer>
      {({ dispatch }: GalleryState) => {
        const onSubmit = (request: SearchRequest) => {
          dispatch({ type: "fetch", data: request });
          history.push(`/${request.searchQuery}`);
        };
        return (
          <Formik
            initialValues={config.defaultQuery}
            validationSchema={searchValidationSchema}
            onSubmit={onSubmit}
          >
            {() => (
              <Form id="search-form">
                <Field
                  name="searchQuery"
                  id="search"
                  placeholder={config.interface.searchPlaceholder}
                  component={SearchInput}
                />
              </Form>
            )}
          </Formik>
        );
      }}
    </GalleryContextConsumer>
  );
};
export default Search;
