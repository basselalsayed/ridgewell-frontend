import React from 'react';
import { Form, Modal, Button, Col, InputGroup, Row } from 'react-bootstrap';

import {
  Formik,
  Field,
  ErrorMessage,
  useField,
  FieldAttributes,
  FieldArray,
} from 'formik';

import * as yup from 'yup';
import { format } from 'date-fns';
import { useState } from 'react';

const EventModal = ({ handleShow, show, start, end, title }) => {
  const [annualLeave, setAnnualLeave] = useState(false);

  return (
    <Modal show={show} onHide={handleShow}>
      <Modal.Header closeButton>
        <Row style={{ width: '80%' }}>
          <Col>
            <Modal.Title>{title}</Modal.Title>
          </Col>
          <Col>
            <Form.Switch
              id='annualLeave-switch'
              label='Annual Leave'
              onChange={() => setAnnualLeave(!annualLeave)}
            />
          </Col>
        </Row>
      </Modal.Header>
      <Modal.Body>
        <RequestForm
          from={format(new Date(start), 'yyyy-MM-dd')}
          until={format(new Date(end), 'yyyy-MM-dd')}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleShow}>
          Close
        </Button>
        <Button variant='primary' onClick={handleShow}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export { EventModal };
let today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object({
  from: yup
    .date()
    .required('Required')
    .min(today, 'Date cannot be in the past'),
  until: yup
    .date()
    .required('Required')
    .when('from', (st, schema) => {
      return yup.date().min(st, 'Date cannot be behind start');
    }),
});

const RequestForm = ({ from, until }) => {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={console.log}
      initialValues={{
        from,
        until,
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId='validationFormik01'>
              <Form.Label>From</Form.Label>
              <Form.Control
                type='date'
                name='from'
                min={format(new Date(today), 'yyyy-MM-dd')}
                value={values.from}
                onChange={handleChange}
                isInvalid={errors.from}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

              <Form.Control.Feedback type='invalid'>
                {errors.from}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} controlId='validationFormik02'>
              <Form.Label>Until</Form.Label>
              <Form.Control
                type='date'
                name='until'
                min={values.from}
                value={values.until}
                onChange={handleChange}
                isInvalid={errors.until}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                {errors.until}
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>

          <Button type='submit'>Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};

// const MyForm = render(<FormExample />);

// const MyTextField  = ({
//   placeholder,
//   ...props
// }) => {
//   const [field, meta] = useField(props);
//   const errorText = meta.error && meta.touched ? meta.error : "";
//   return (
//     <TextField
//       placeholder={placeholder}
//       {...field}
//       helperText={errorText}
//       error={!!errorText}
//     />
//   );
// };

// const validationSchema = yup.object({
//   firstname: yup
//     .string()
//     .required()
//     .max(10),
//   pets: yup.array().of(
//     yup.object({
//       name: yup.string().required()
//     })
//   )
// });

// const App: React.FC = () => {
//   return (
//     <div>
//       <Formik
//         validateOnChange={true}
//         initialValues={{
//           firstName: "",
//           lastName: "",
//           isTall: false,
//           cookies: [],
//           yogurt: "",
//           pets: [{ type: "cat", name: "jarvis", id: "" + Math.random() }]
//         }}
//         validationSchema={validationSchema}
//         // validate={values => {
//         //   const errors: Record<string, string> = {};

//         //   if (values.firstName.includes("bob")) {
//         //     errors.firstName = "no bob";
//         //   }

//         //   return errors;
//         // }}
//         onSubmit={(data, { setSubmitting }) => {
//           setSubmitting(true);
//           // make async call
//           console.log("submit: ", data);
//           setSubmitting(false);
//         }}
//       >
//         {({ values, errors, isSubmitting }) => (
//           <Form>
//             <MyTextField placeholder="first name" name="firstName" />
//             <div>
//               <Field
//                 placeholder="last name"
//                 name="lastName"
//                 type="input"
//                 as={TextField}
//               />
//             </div>
//             <Field name="isTall" type="checkbox" as={Checkbox} />
//             <div>cookies:</div>
//             <Field
//               name="cookies"
//               type="checkbox"
//               value="chocolate chip"
//               as={Checkbox}
//             />
//             <Field
//               name="cookies"
//               type="checkbox"
//               value="snickerdoodle"
//               as={Checkbox}
//             />
//             <Field name="cookies" type="checkbox" value="sugar" as={Checkbox} />
//             <div>yogurt</div>
//             <MyRadio name="yogurt" type="radio" value="peach" label="peach" />
//             <MyRadio
//               name="yogurt"
//               type="radio"
//               value="blueberry"
//               label="blueberry"
//             />
//             <MyRadio name="yogurt" type="radio" value="apple" label="apple" />
//             <FieldArray name="pets">
//               {arrayHelpers => (
//                 <div>
//                   <Button
//                     onClick={() =>
//                       arrayHelpers.push({
//                         type: "frog",
//                         name: "",
//                         id: "" + Math.random()
//                       })
//                     }
//                   >
//                     add pet
//                   </Button>
//                   {values.pets.map((pet, index) => {
//                     return (
//                       <div key={pet.id}>
//                         <MyTextField
//                           placeholder="pet name"
//                           name={`pets.${index}.name`}
//                         />
//                         <Field
//                           name={`pets.${index}.type`}
//                           type="select"
//                           as={Select}
//                         >
//                           <MenuItem value="cat">cat</MenuItem>
//                           <MenuItem value="dog">dog</MenuItem>
//                           <MenuItem value="frog">frog</MenuItem>
//                         </Field>
//                         <Button onClick={() => arrayHelpers.remove(index)}>
//                           x
//                         </Button>
//                       </div>
//                     );
//                   })}
//                 </div>
//               )}
//             </FieldArray>
//             <div>
//               <Button disabled={isSubmitting} type="submit">
//                 submit
//               </Button>
//             </div>
//             <pre>{JSON.stringify(values, null, 2)}</pre>
//             <pre>{JSON.stringify(errors, null, 2)}</pre>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default App;
