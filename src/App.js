import './App.css';
import MultipleSelect from './components/Select';
import { useState } from 'react';
import JobsComponent from './components/JobsComponent';
import { store } from './store';
import { Provider } from 'react-redux';
import CompanyFilterComponent from './components/CompanyName';

function App() {
  const rolesItems = [
    {
      category: 'Engineering', roles: ['Backend', 'Frontend', 'Fullstack', 'IOS', 'Flutter', 'React Native', 'Android', 'Tech Lead',
        'Dev-Ops', 'Data Engineer', 'Data Science', 'Computer-Vision', 'Nlp', 'Deep Learning', 'Test/Qa', 'Web3', 'Sre', 'Data-Infrastructure']
    },
    { category: 'Design', roles: ['Designer', 'Design Manager', 'Graphic Designer', 'Product Designer'] },
    { category: 'Product', roles: ['Product Manager'] },
    { category: 'Operations', roles: ['Operations Manager', "Founder's Office/Chief of Staff"] },
    { category: 'Sales', roles: ['Sales Development Representative', 'Account Executive', 'Account Manager'] },
    { category: 'Marketing', roles: ['Digital Marketing Manager', 'Growth Hacker', 'Marketing', 'Product Marketing Manager'] },
    { category: 'Other Engineering', roles: ['Hardware', 'Mechanical', 'Systems'] },
    { category: 'Business Analyst', roles: ['Business Analyst'] },
    { category: 'Data Analyst', roles: ['Data Analyst'] },
    { category: 'Project Manager', roles: ['Project Manager'] },
    { category: 'Management', roles: ['Management'] },
    { category: 'Legal', roles: ['Legal'] },
    { category: 'Hr', roles: ['Hr'] },
    { category: 'Finance', roles: ['Finance'] }

  ];

  const numOfEmp = [
    '1-10',
    '11-20',
    '21-50',
    '51-100',
    '101-200',
    '201-500',
    '500+'
  ];

  const remote = ['Remote', 'Hybrid', 'In-Office'];

  const exp = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
  ];

  const minBaseSalary = [
    '0 USD', '10 USD', '20 USD', '30 USD', '40 USD', '50 USD', '60 USD', '70 USD', '100+ USD'
  ];

  const techStackItems = [
    'JavaScript', 'Python', 'Java', 'C#', 'Ruby', 'Elixir', 'Go', 'Rust', 'C++', 'Ruby/Rails'
  ];

  const [selectedRoles, setSelectedRoles] = useState([]);

  const [showTechStack, setShowTechStack] = useState(false);

  const [selectedCompany, setCompantName] = useState('');

  const [selectRemote, setRemote] = useState([]);



  const handleRoleChange = (selected) => {
    setSelectedRoles(selected);
    const engineeringRoles = rolesItems.find(category => category.category === 'Engineering')?.roles || [];
    setShowTechStack(selected.some(role => engineeringRoles.includes(role)));
  };


  const handleCompanyName = (company) => {
    setCompantName(company);
  }

  console.log("DASDASDAS", handleCompanyName)

  const handleRemote = (remote) => {
    setRemote(remote);
  }

  return (
    <>
      <div className='container'>
        <MultipleSelect
          dropdownName='Roles'
          items={rolesItems}
          multiple={true}
          onSelectionChange={handleRoleChange}

        />
        {showTechStack &&
          <MultipleSelect
            dropdownName='Tech Stack'
            items={techStackItems}
            multiple={true}
          />
        }


        <MultipleSelect
          dropdownName='Number of Employees'
          items={numOfEmp}
        />

        <MultipleSelect
          dropdownName='Experience'
          items={exp}
          multiple={false}
        />

        <MultipleSelect
          dropdownName='Remote'
          items={remote}
          onSelectionChange={handleRemote}
        />

        <MultipleSelect
          dropdownName='Min Base Salary'
          items={minBaseSalary}
        />

        <CompanyFilterComponent
          onSelectionChange={handleCompanyName}
        />
      </div>

      <div className='jobs-section'>
        <JobsComponent
          selectedRoles={selectedRoles}
          selectedCompany={selectedCompany}
          selectRemote={selectRemote}
        />
      </div>
    </>
  );
}

export default App;