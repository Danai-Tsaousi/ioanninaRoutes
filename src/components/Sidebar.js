import { MenuItem } from '@material-ui/core';
import React from 'react';
import { fallDown as Menu } from 'react-burger-menu';

export default props => {

  const handleMenuOne = () => {
    console.log('clicked one');
  };

  const handleMenuTwo = () => {
    console.log('clicked two');
  };


  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>
      
      <a className='menu-item'>
        <h3>Choose a Route</h3>
        <Dropdown
          trigger={<button>ROUTES</button>}
          menu={[
            <button onClick={handleMenuOne}>16: Dikastiko-Panepistimio</button>,
            <button onClick={handleMenuTwo}>17</button>,
          ]}
        />
      </a>

      <a className='menu-item'>
        <h1>Create Charts</h1>

        <h3>Select char type</h3>
        <Dropdown
          trigger={<button>Char Type</button>}
          menu={[
            <button onClick={handleMenuOne}>Line Chart</button>,
            <button onClick={handleMenuTwo}>Bar Chart </button>,
          ]}
        />

      </a>
      <a className='menu-item'>
        <h3>Select variables for x-y</h3>
        <Dropdown
          trigger={<button>Variables</button>}
          menu={[
            <button onClick={handleMenuOne}>Time - Crowd</button>,
            <button onClick={handleMenuTwo}>Bus Stops - Crowd</button>,
            <button onClick={handleMenuTwo}>Time - Delay </button>,
          ]}
        />       
       </a>
    </Menu>
  );
};


const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};