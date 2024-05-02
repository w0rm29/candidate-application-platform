import './App.css';
import MultipleSelect from './components/Select';

function App() {
  return (
    <div className='head'>
      <MultipleSelect dropdownName='Roles' items={[
        'Backend',
        'Frontend',
        'FullStack',
        'IOS',
        'Flutter',
        'React Native',
        'Android',
        'Tech Lead',
        'Dev-Ops',

      ]} />
      <MultipleSelect dropdownName='Number of Employees' items={[
        '1-10',
        '11-20',
        '21-50',
        '51-100',
        '101-200',
        '201-500',
        '500+'
      ]} />
      <MultipleSelect dropdownName='Experience' items={[
        '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
      ]} />
      <MultipleSelect dropdownName='Remote' items={['Remote', 'Hybrid', 'In-Office']} />
      <MultipleSelect dropdownName='Minimum Base Salary' items={[]} />

    </div>
  );
}

export default App;
