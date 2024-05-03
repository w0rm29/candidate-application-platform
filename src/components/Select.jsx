import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ListSubheader from '@mui/material/ListSubheader';
import Chip from '@mui/material/Chip';
import ClearIcon from '@mui/icons-material/Clear';

export default function MultipleSelect({ dropdownName, items, onSelectionChange, multiple = true }) {
    const theme = useTheme();
    const [selectedItems, setSelectedItems] = React.useState([]);

    console.log("SELECTED ITEMS", selectedItems.map(item => item.toLowerCase()));

    const handleChange = (event) => {
        const { target: { value } } = event;
        setSelectedItems(typeof value === 'string' ? value.split(',') : value);
        if (onSelectionChange) {
            onSelectionChange(typeof value === 'string' ? value.split(',') : value);
        }
    };

    const handleDelete = (valueToRemove) => () => {
        const newSelectedItems = selectedItems.filter(item => item.toLowerCase() !== valueToRemove.toLowerCase());
        setSelectedItems(newSelectedItems);
        if (onSelectionChange) {
            onSelectionChange(newSelectedItems);
        }
    };

    const handleClearAll = () => {
        setSelectedItems([]);
        if (onSelectionChange) {
            onSelectionChange([]);
        }
    };

    const renderMenuItems = () => {
        const menuItems = [];
        items.forEach((item, idx) => {
            if (item.category) {
                menuItems.push(<ListSubheader key={`subheader-${idx}`}>{item.category}</ListSubheader>);
                item.roles.forEach(role => {
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
            } else {
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
        });
        return menuItems;
    };

    const renderValue = (selected) => (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selected.map((value) => (
                <Chip
                    key={value}
                    label={value}
                    onDelete={handleDelete(value)}
                    deleteIcon={<ClearIcon onClick={handleClearAll} />}
                    style={{ margin: 2 }}
                />
            ))}
            {selected.length > 0 && (
                <ClearIcon
                    onClick={handleClearAll}
                    style={{ marginLeft: 'auto', cursor: 'pointer', color: theme.palette.grey[500] }}
                />
            )}
        </div>
    );

    return (
        <FormControl sx={{ m: 1, width: 'auto', minWidth: 250, maxWidth: 400 }}>
            <InputLabel id={`label-${dropdownName}`}>{dropdownName}</InputLabel>
            <Select
                labelId={`label-${dropdownName}`}
                id={`select-${dropdownName}`}
                multiple={multiple}
                value={selectedItems}
                onChange={handleChange}
                input={<OutlinedInput label={dropdownName} />}
                renderValue={renderValue}
            >
                {renderMenuItems()}
            </Select>
        </FormControl>
    );
}

function getStyles(name, selectedItems, theme) {
    return {
        fontWeight: selectedItems.includes(name) ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    };
}
