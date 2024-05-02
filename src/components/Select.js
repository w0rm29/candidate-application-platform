import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';

// TODO : handleDelete not working as expected, Chip component not working

export default function MultipleSelect({ dropdownName, items }) {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = React.useState([]);

    const handleChange = (event) => {
        const { target: { value } } = event;
        setSelectedItems(typeof value === 'string' ? value.split(',') : value);
    };

    const handleDelete = (valueToRemove) => () => {
        console.log("Value to remove:", valueToRemove);
        console.log("Current selected items before removal:", selectedItems);
        setSelectedItems(prev => prev.filter(item => item !== valueToRemove));
    };

    const renderMenuItems = () => {
        // Using menuItems array to push the ListSubheader component
        const menuItems = [];
        items.forEach((item, idx) => {
            if (item.category) {
                menuItems.push(<ListSubheader key={`subheader-${idx}`}>{item.category}</ListSubheader>);
                item.roles.forEach(role => {
                    // remove item that is selected from the dropdown
                    if (!selectedItems.includes(role)) {
                        menuItems.push(
                            <MenuItem
                                key={role}
                                value={role}
                                style={getStyles(role, selectedItems, theme)}
                            >
                                {role}
                            </MenuItem>
                        );
                    }
                });
            } else if (typeof item === 'string') {
                if (!selectedItems.includes(item)) {
                    menuItems.push(
                        <MenuItem
                            key={item}
                            value={item}
                            style={getStyles(item, selectedItems, theme)}
                        >
                            {item}
                        </MenuItem>
                    );
                }
            }
        });
        return menuItems;
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id={`label-${dropdownName}`}>{dropdownName}</InputLabel>
                <Select
                    labelId={`label-${dropdownName}`}
                    id={`select-${dropdownName}`}
                    multiple
                    value={selectedItems}
                    onChange={handleChange}
                    input={<OutlinedInput label={dropdownName} />}
                    renderValue={(selected) => (
                        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                            {selected.map((value) => (
                                <Chip
                                    key={value}
                                    label={value}
                                    onDelete={handleDelete(value)}
                                    deleteIcon={<DeleteIcon />}
                                    style={{ margin: 2 }}
                                    className='chip'
                                />
                            ))}
                        </div>
                    )}
                >
                    {renderMenuItems()}
                </Select>
            </FormControl>
        </div>
    );
}

function getStyles(name, selectedItems, theme) {
    return {
        fontWeight:
            selectedItems.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}
