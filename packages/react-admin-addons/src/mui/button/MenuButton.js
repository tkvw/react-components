import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { MenuList } from 'material-ui/Menu';
import Grow from 'material-ui/transitions/Grow';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';
import { Manager, Target, Popper } from 'react-popper';
import ClickAwayListener from 'material-ui/utils/ClickAwayListener';
import { Button } from 'react-admin';

const styles = {
    root: {
        display: 'flex',
    },
    menu: {
        zIndex: 1,
    },
    popperClose: {
        pointerEvents: 'none',
    },
};

class MenuButton extends React.Component {
    state = {
        open: false,
    };
    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const {
            children,
            classes,
            buttonComponent: ButtonComponent = Button,
            ...rest
        } = this.props;
        const { open } = this.state;

        return (
            <Manager>
                <Target>
                    <ButtonComponent
                        aria-owns={this.state.open ? 'menu-list' : null}
                        aria-haspopup="true"
                        onClick={this.handleClick}
                        {...rest}
                    />
                </Target>
                <Popper
                    placement="bottom-start"
                    eventsEnabled={open}
                    className={classnames(
                        { [classes.popperClose]: !open },
                        classes.menu
                    )}
                >
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <Grow
                            in={open}
                            id="menu-list"
                            style={{ transformOrigin: '0 0 0' }}
                        >
                            <Paper>
                                <MenuList role="menu">
                                    {children(this.handleClose)}
                                </MenuList>
                            </Paper>
                        </Grow>
                    </ClickAwayListener>
                </Popper>
            </Manager>
        );
    }
}

MenuButton.propTypes = {
    children: PropTypes.func,
    classes: PropTypes.object.isRequired,
    buttonComponent: PropTypes.func,
};

export default withStyles(styles)(MenuButton);
