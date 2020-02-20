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

const searchQueryWarning = "Please search for a meaningful experience.";
const searchValidationSchema = Yup.object().shape({
  searchQuery: Yup.string()
    .min(1, searchQueryWarning)
    .required(searchQueryWarning)
});

const SearchInput: React.FC<any> = ({
  field,
  form: { touched, errors, ...rest },
  ...props
}) => (
  <FormGroup>
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

const Search: React.FC<ISearch> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        searchQuery: ""
      }}
      validationSchema={searchValidationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form>
          <Field
            name="searchQuery"
            id="search"
            placeholder="What do you want to experience?"
            component={SearchInput}
          />
        </Form>
      )}
    </Formik>
  );
};
export default Search;
