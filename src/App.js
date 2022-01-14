import { useEffect, useState } from "react";
import "./app.css";
const fields = {
  title: {
    label: "Your Project title",
    type: "text",
    placeholder: "Type your title",
  },
  description: {
    label: "Describe about This?",
    type: "textarea",
    placeholder: "Your Project descriptions",
  },
  startDate: {
    label: "What you want to your project start?",
    type: "date",
    placeholder: "1-1-2022",
  },
  deadline: {
    label: "What your project deadline?",
    type: "date",
    placeholder: "2-2-2022",
  },
  subTask: {
    label: "Have you any sub project?",
    type: "textarea",
    placeholder: "Describe you sub project",
  },
  color: {
    label: "Do you have any favorite color?",
    type: "color",
    placeholder: "Describe you sub project",
  },
};

function App() {
  const [data, setData]=useState(fields)
  const [addLabel, setAddLabel] = useState({
    label: "",
    modal: false,
  });

  const modalChange = (e)=>{
    setAddLabel({
      ...addLabel,
      [e.target.name]: e.target.value
    })
  }
  const modalSubmit = (e)=>{
    e.preventDefault();

    const subPro = {
      label: `What your project ${addLabel.label}`,
      type: "text",
      placeholder:`Type ${addLabel.label}`
    }
    setData({...data, subTask: subPro})
    setAddLabel({
      ...addLabel,
      modal: false
    })
  }
  const transformObject = (obj) => {
    return Object.keys(obj).reduce((acc, cur) => {
      acc[cur] = {
        ...obj[cur],
        value: "",
      };
      return acc;
    }, {});
  };
  const mapObjectToArray = (obj) => {
    return Object.keys(obj).map((key, index) => ({
      name: key,
      key: (index + 1 + key).toUpperCase(),
      ...obj[key],
    }));
  };

  const [formState, setFormState] = useState({});
  const formArray = mapObjectToArray(formState);
 
useEffect(()=>{
  setFormState(transformObject(data));
},[data])
  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: {
        ...formState[event.target.name],
        value: event.target.value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const values = Object.keys(formState).reduce((acc, cur) => {
      acc[cur] = formState[cur].value;
      return acc;
    }, {});
    console.log(values);
  };

  return (
    <div className="container">
      <div className="form-fields">
        <h1>We do the project, what! you want.</h1>
        <form onSubmit={handleSubmit}>
          {formArray.map((item, idx) => (
            <div key={item.key} className="form-item">
              <h4>
                <label>{item.label}</label>
              </h4>{" "}
              <br />
              {item.type === "textarea" ? (
                <textarea
                  name={item.name}
                  value={item.value}
                  onChange={handleChange}
                  placeholder={item.placeholder}
                  rows={4}
                  cols={50}
                ></textarea>
              ) : (
                <input
                  type={item.type}
                  placeholder={item.placeholder}
                  onChange={handleChange}
                  name={item.name}
                  value={item.value}
                />
              )}
            </div>
          ))}
          <div className="add-label">
            <button onClick={() => setAddLabel({ ...addLabel, modal: true })}>
              + Add Label
            </button>
            
          </div>
          <div className="btn-submit">
            <button type="submit">Send</button>
          </div>
        </form>
        {addLabel.modal && (
              <div className="modal">
                <div className="modal-title">
                  <h1>Add any label if you need</h1>
                  <button
                    onClick={() => setAddLabel({ ...addLabel, modal: false })}
                  >
                    Close
                  </button>
                </div>
                <form onSubmit={modalSubmit}>
                  <div>
                    <label>Label Name</label>
                    <input type="text" name="label" onChange={modalChange}/>
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
      </div>
    </div>
  );
}

export default App;
