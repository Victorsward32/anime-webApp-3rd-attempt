import React, { useState, useEffect, useRef } from 'react';
import '../../scss/components/dropDown.scss';
import down from '../../assets/icons/down.svg';

const DropDown = ({ data = [], title = 'Select', multiSelect = false, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedSingle, setSelectedSingle] = useState(null);
    const dropdownRef = useRef(null);

    const isObject = !Array.isArray(data) && typeof data === 'object';
    const entries = isObject ? Object.entries(data) : data.map((item, i) => [i, item]);

    const toggleDropdown = () => setIsOpen(prev => !prev);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleItemClick = (key, value) => {
        if (multiSelect) {
            const exists = selectedItems.find(item => item.key === key);
            let newSelected;
            if (exists) {
                newSelected = selectedItems.filter(item => item.key !== key);
            } else {
                newSelected = [...selectedItems, { key, value }];
            }
            setSelectedItems(newSelected);
            onChange && onChange(newSelected.map(item => item.value));
        } else {
            setSelectedSingle({ key, value });
            onChange && onChange(value);
            setIsOpen(false);
        }
    };

    const isChecked = (key) => {
        return selectedItems.some(item => item.key === key);
    };

    const filteredEntries = entries.filter(([key, value]) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getSelectedLabel = () => {
        if (multiSelect) {
            return selectedItems.length > 0
                ? selectedItems.map(item => item.value).join(', ')
                : title;
        } else {
            return selectedSingle?.value || title;
        }
    };

    return (
        <div data-component="drop-down" ref={dropdownRef}>
            <div className="parent-container" onClick={toggleDropdown}>
                <label className="main-title">{getSelectedLabel()}</label>
                <img
                    alt="arrowIcon"
                    src={down}
                    className={isOpen ? 'up-image' : 'down-image'}
                />
            </div>

            {isOpen && (
                <div className="child-container">
                    <input
                        className="dropdown-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <ul className="dropdown-list">
                        {filteredEntries.length === 0 && (
                            <li className="dropdown-item disabled">No results</li>
                        )}
                        {filteredEntries.map(([key, value]) => (
                            <li
                                key={key}
                                className={`dropdown-item ${
                                    isChecked(key) || selectedSingle?.key === key ? 'selected' : ''
                                }`}
                                onClick={() => handleItemClick(key, value)}
                            >
                                {multiSelect && (
                                    <input
                                        type="checkbox"
                                        checked={isChecked(key)}
                                        readOnly
                                        className="checkbox"
                                    />
                                )}
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropDown;
