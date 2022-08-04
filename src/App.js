import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [type, setType] = useState('');
    const [state, setState] = useState('');
    const [selected, setSelected] = useState({});
    const [list, setList] = useState([]);
    const [error, setError] = useState('');

    const selectRep = (event) => {
      setType('Representatives');
      setList([]);
      setSelected({});
    }
    const selectSen = (event) => {
      setType('Senators');
      setList([]);
      setSelected({});
    }

    const getList = () => {
      axios.get(`http://localhost:3000/${type}/${state}`).then (response => {
        if(response.data.results) {
          setList(response.data.results);
          setError('')
        } else {
          setError(`There are no ${type} for this state.`);
        }
      })
    }

    const selectPerson = (e, peep) => {
      setSelected(peep);
    }
  return (
    <div className="container mx-auto">
      <div className="flex justify-center gap-20 my-9 animate-fade-in-down">
        <div>
          <h4>Are you looking for a Representative or a Senator?</h4>
          <button className="selectable-button mt-5" onClick={( (e) => selectRep(e))}>
            Representative
          </button>
          <button className="selectable-button mt-5" onClick={( (e) => selectSen(e))}>
            Senator
          </button>
        </div>
        <div>
          <h4>What state are you looking for?</h4>
          <select className="mt-5 p-3 border border-gray-200 rounded-lg" name="state" id="state" onChange={(e) => setState(e.target.value || null)}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </select>
        </div>
      </div>
      <div className="w-100 text-center">
        { (type && state) &&
          <button className="button animate-fade-in-down" onClick={(e) => getList(e)}>
            Find {type} in {state}
          </button>
        }
      </div>

      {error}
      {list[0] &&      
        <section className="grid grid-cols-2 gap-8">
          <div className="animate-fade-in-down">
            <h2 className="text-3xl py-3">List / <span className="text-cornflower">{type}</span></h2>
            <div className="bg-gray-100 flex space p-4 ">
              <div className="flex-auto w-4/5 text-lg">Name</div>
              <div className="flex-auto ">Party</div>
            </div>
            {list.map( (item, index) => 
              <div className="flex text-lg p-4 border-b-[1px] " key={index} onClick={(e) => selectPerson(e, item)}>
                <div className="flex-auto w-4/5 ">
                  {item.name}
                </div>
                <div className="flex-auto ">
                  {item.party[0].toUpperCase()}
                </div>
              </div>
            )}
          </div>
          { selected.name &&        
            <div className="animate-fade-in-down">
              <h2 className="text-3xl py-3">Info</h2>
              <div className="bg-gray-100 flex space p-4 mb-4 rounded-md">
                <div className="text-gray-400 text-xl w-1/3">
                  First Name
                </div>
                <div className="text-xl flex-1 w-2/3">
                  {selected.name.split(' ').slice(0, -1).join(' ')}
                </div>
              </div>
              <div className="bg-gray-100 flex space p-4 mb-4 rounded-md">
                <div className="text-gray-400 text-xl w-1/3">
                  Last Name
                </div>
                <div className="text-xl flex-1 w-2/3">
                  {selected.name.split(' ').slice(-1).join(' ')}
                </div>
              </div>
              <div className="bg-gray-100 flex space p-4 mb-4 rounded-md">
                <div className="text-gray-400 text-xl w-1/3">
                  District
                </div>
                <div className="text-xl flex-1 w-2/3">
                  {selected.district}
                </div>
              </div>
              <div className="bg-gray-100 flex space p-4 mb-4 rounded-md">
                <div className="text-gray-400 text-xl w-1/3">
                  Phone
                </div>
                <div className="text-xl flex-1 w-2/3">
                  {selected.phone}
                </div>
              </div>
              <div className="bg-gray-100 flex space p-4 mb-4 rounded-md">
                <div className="text-gray-400 text-xl w-1/3">
                  Office
                </div>
                <div className="text-xl flex-1 w-2/3 new-line">
                  {selected.office.split(";").join("\n")}
                </div>
              </div>
              {selected.link &&
                <a href={selected.link} target="_blank" className="button">Visit {selected.name}'s website</a>
              }
            </div>
          }
        </section>
      }
    </div>
  );
}

export default App;
