import { removeQueryParams } from "lib"
// import classes from "../Sidebar.module.scss"
import { Button } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  dateRangeFacet: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  
  dateFacet: {
    marginBottom: '0.5rem',
  
    '& span': {
      display: 'block',
      marginBottom: '0.25rem'
    },
  
    '& input': {
      border: '0.05rem solid #cac7c7',
      borderRadius: '0.125rem',
      padding: '0.5rem 0.5rem',
    }
  }
}))

const DateFacet = ({route, after, before }) => {
  const [afterState, setAfter] = useState(after || "")
  const [beforeState, setBefore] = useState(before || "")
  const router = useRouter()
  const classes = useStyles()

  useEffect((after, before) => {
    if (
      after !== afterState ||
      before !== beforeState
    ) {
      setAfter(after || "")
      setBefore(before || "")
    }
  }, [after, before])

  const cleanText = (target, compare) => {
    let year = target.value;
    if (isNaN(target.value)) {
      year = compare;
      target.value = year;
    }
    return year;
  }

  const handleAfterText = event => {
    let year = cleanText(event.target, afterState);
    setAfter(year)
  };

  const validateAfter = event => {
    let year = cleanText(event.target, afterState);
    if (year !== "" && beforeState !== "" && year > beforeState) {
      year = beforeState;
      setAfter(year)
    }
  };

  const handleBeforeText = event => {
    let year = cleanText(event.target, beforeState);
    setBefore(year)
  };

  const validateBefore = event => {
    let year = cleanText(event.target, beforeState);
    if (year !== "" && afterState !== "" && year < afterState) {
      year = afterState;
      setBefore(year)
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 13) {
      handleDateSubmit(event);
    }
  }

  const handleDateSubmit = event => {
    event.preventDefault();
    const dateProps = getDateProps();
    router.push({
      pathname: route.pathname,
      query: Object.assign(
        {},
        removeQueryParams(route.query, ["after", "before"]),
        dateProps,
        {
          page: 1
        }
      )
    });
  }

  const getDateProps = () => {
    let dateProps = {};
    if (afterState !== "") dateProps.after = afterState;
    if (beforeState !== "") dateProps.before = beforeState;
    return dateProps;
  }

  const formVals = Object.assign(
    {},
    removeQueryParams(route.query, ["after", "before", "page"]),
    {
      page: 1
    }
  );

  return (
    <form
      action={route.pathname}
      method="get"
      className={classes.dateRangeFacet}
      onSubmit={e => handleDateSubmit(e)}
    >
      <label className={classes.dateFacet} htmlFor="after-date">
        <input
          id="after-date"
          type="numeric"
          name="after"
          value={afterState}
          onChange={(e) => handleAfterText(e)}
          onBlur={e => validateAfter(e)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="Start Year"
        />
      </label>
      <label className={classes.dateFacet} htmlFor="before-date">
        <input
          id="before-date"
          type="numeric"
          name="before"
          value={beforeState}
          onChange={e => handleBeforeText(e)}
          onBlur={e => validateBefore(e)}
          onKeyDown={e => handleKeyDown(e)}
          placeholder="End Year"
        />
      </label>
      {Object.entries(formVals).map(([k, v], index) => {
        return <input type="hidden" name={k} key={index} value={v} />;
      })}
      <Button variant="contained" color="primary" disableElevation type="submit">
        SET
      </Button>
    </form>
  );
}

export default DateFacet