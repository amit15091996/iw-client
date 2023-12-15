import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        maxWidth: '100%',
        margin: '0 auto',
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          minWidth: '100px', // Set a minimum width for the tabs
        }}
      >
        <Tab label="Development" {...a11yProps(0)} />
        <Tab label="Testing" {...a11yProps(1)} />
        <Tab label="Expert Guidance" {...a11yProps(2)} />
        <Tab label="Development" {...a11yProps(3)} />
        <Tab label="Testing" {...a11yProps(4)} />
        <Tab label="Expert Guidance" {...a11yProps(5)} />
        {/* Add other Tab components */}
      </Tabs>
      <Box sx={{ flex: 1 }}>
        <TabPanel value={value} index={0}>
          {/* Content for Development Tab */}
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* Content for Testing Tab */}
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
          One of our core strengths lies in our investment in software development. We develop and deliver high quality products in accordance with specifications.
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/* Content for Expert Guidance Tab */}
          Item Three
        </TabPanel>
        {/* Add other TabPanel components */}
      </Box>
    </Box>
  );
}
