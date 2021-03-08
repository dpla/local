import React from "react"
import { removeQueryParams } from "lib"
import css from "../Sidebar.module.scss"
import { Button } from '@material-ui/core'

class DateFacet extends React.Component {
  componentWillMount() {
    this.setState({
      after: this.props.after || "",
      before: this.props.before || ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.after !== this.state.after ||
      nextProps.before !== this.state.before
    ) {
      this.setState({
        after: nextProps.after || "",
        before: nextProps.before || ""
      });
    }
  }

  cleanText(target, compare) {
    let year = target.value;
    if (isNaN(target.value)) {
      year = compare;
      target.value = year;
    }
    return year;
  }

  handleAfterText = event => {
    let year = this.cleanText(event.target, this.state.after);
    this.setState({
      before: this.state.before,
      after: year
    });
  };

  validateAfter = event => {
    let year = this.cleanText(event.target, this.state.after);
    if (year !== "" && this.state.before !== "" && year > this.state.before) {
      year = this.state.before;
      this.setState({
        before: this.state.before,
        after: year
      });
    }
  };

  handleBeforeText = event => {
    let year = this.cleanText(event.target, this.state.before);
    this.setState({
      after: this.state.after,
      before: year
    });
  };

  validateBefore = event => {
    let year = this.cleanText(event.target, this.state.before);
    if (year !== "" && this.state.after !== "" && year < this.state.after) {
      year = this.state.after;
      this.setState({
        after: this.state.after,
        before: year
      });
    }
  };

  handleKeyDown(e) {
    if (e.keyCode === 13) {
      this.handleDateSubmit(e);
    }
  }

  handleDateSubmit(e) {
    e.preventDefault();
    const dateProps = this.getDateProps();
    Router.push({
      pathname: this.props.route.pathname,
      query: Object.assign(
        {},
        removeQueryParams(this.props.route.query, ["after", "before"]),
        dateProps,
        {
          page: 1
        }
      )
    });
  }

  getDateProps() {
    let dateProps = {};
    if (this.state.after !== "") dateProps.after = this.state.after;
    if (this.state.before !== "") dateProps.before = this.state.before;
    return dateProps;
  }

  render() {
    // NOTE: this form should maybe be wrapping the entire sidebar?
    const formVals = Object.assign(
      {},
      removeQueryParams(this.props.route.query, ["after", "before", "page"]),
      {
        page: 1
      }
    );
    return (
      <form
        action={this.props.route.pathname}
        method="get"
        className={css.dateRangeFacet}
        onSubmit={e => this.handleDateSubmit(e)}
      >
        <label className={css.dateFacet} htmlFor="after-date">
          <input
            id="after-date"
            type="numeric"
            name="after"
            value={this.state.after}
            onChange={e => this.handleAfterText(e)}
            onBlur={e => this.validateAfter(e)}
            onKeyDown={e => this.handleKeyDown(e)}
            placeholder="Start Year"
          />
        </label>
        <label className={css.dateFacet} htmlFor="before-date">
          <input
            id="before-date"
            type="numeric"
            name="before"
            value={this.state.before}
            onChange={e => this.handleBeforeText(e)}
            onBlur={e => this.validateBefore(e)}
            onKeyDown={e => this.handleKeyDown(e)}
            placeholder="End Year"
          />
        </label>
        {Object.entries(formVals).map(([k, v], index) => {
          return <input type="hidden" name={k} key={index} value={v} />;
        })}
        <Button type="secondary" className={css.dateButton} mustsubmit="true">
          SET
        </Button>
      </form>
    );
  }
}

export default DateFacet