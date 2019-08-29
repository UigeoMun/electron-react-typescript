import * as React from 'react';
import { Container, Paper, Tab, Tabs } from '@material-ui/core';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import * as R from 'ramda';
import { strict } from 'assert';
import { borderBottom } from '@material-ui/system';
const useStyles = makeStyles({
    root: {
        flexGrow: 1
    }
});

type TabObj = {
    label: string;
    panel: React.ReactNode;
};

type Props = {
    tabIndex: number;
    handleTab(tab: number): void;
    tabs: TabObj[];
};

const MainApp: React.SFC<Props> = ({ tabIndex, handleTab, tabs }) => {
    const classes = useStyles();

    const onClickTab = (e: React.ChangeEvent<{}>, v: any): void => {
        handleTab(v);
    };

    const RenderTab = (tab: TabObj) => <Tab key={tab.label} label={tab.label} />;
    const RenderTabs = R.map(RenderTab);

    const RenderPanel = (i: number, tabs: TabObj[]) => tabs[i].panel;

    return (
        <React.Fragment>
            <Tabs
                value={tabIndex}
                onChange={onClickTab}
                indicatorColor="primary"
                textColor="primary"
                centered={true}
                style={{
                    borderBottom: '1px solid grey'
                }}
            >
                {RenderTabs(tabs)}
            </Tabs>

            {RenderPanel(tabIndex, tabs)}
        </React.Fragment>
    );
};

export default MainApp;
