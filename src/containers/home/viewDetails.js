import React, { Fragment } from "react";
import { Button, Typography, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import _get from "lodash.get";

import Table from "../../components/table";
import Modal from "../../components/modal";

const columns = [
  "C-Port Name",
  "Card Name",
  "DWDM Name",
  "Optical Node Name",
  "Slot Name",
  "Optical Node TID",
  "Parent Slots 1",
  "Frequency"
];

const LinkBack = ({ value, id }) => (
  <Link
    href={`http://helixfixed.singtelgroup.net/common/uobject.jsp?object=${id}`}
  >
    {value}
  </Link>
);

const useStyles = makeStyles(theme => ({
  directionTable: {
    marginTop: `-${theme.spacing.unit * 2.5}px`
  },
  mainButton: {
    color: "#186280 !important",
    borderColor: "#186280 !important"
  },
  link: {
    color: "#186280 !important"
  },
  customText: {
    fontSize: "0.875rem !important"
  }
}));

const OdusTable = ({ odus, data, from, to, classes, linkFrom, linkTo }) => {
  return odus.map((od, index) => {
    const allData = [
      { type: "a", ..._get(od, "a"), port: data.from_i, id: linkFrom },
      { type: "z", ..._get(od, "z"), port: data.to_i, id: linkTo }
    ];

    return allData.map(odData => {
      const rows = [
        [
          {
            property: (
              <LinkBack
                id={_get(odData, "C-Port ID")}
                value={_get(odData, "C-Port Name")}
              />
            )
          },
          {
            property: (
              <LinkBack
                id={_get(odData, "Card ID")}
                value={_get(odData, "Card Name")}
              />
            )
          },
          {
            property: (
              <LinkBack
                id={_get(odData, "DWDM ID")}
                value={_get(odData, "DWDM Name")}
              />
            )
          },
          {
            property: (
              <LinkBack
                id={_get(odData, "Optical Node ID")}
                value={_get(odData, "Optical Node Name")}
              />
            )
          },
          {
            property: (
              <LinkBack
                id={_get(odData, "Slot ID")}
                value={_get(odData, "Slot Name")}
              />
            )
          },
          {
            property: _get(odData, "Optical Node TID")
          },
          {
            property: _get(odData, "Parent Slots 1") ? (
              <Typography
                component={"p"}
                noWrap={true}
                className={classes.customText}
              >
                {_get(odData, "Parent Slots 1")
                  .split(", ")
                  .map(item => (
                    <span>
                      {item} <br />
                    </span>
                  ))}
              </Typography>
            ) : (
              ""
            )
          },
          {
            property: _get(od, `_och[0].lambda`)
          }
        ]
      ];

      return (
        <Fragment>
          <Typography>
            {odData.id} : {odData.port}
          </Typography>
          <Table
            tableData={{
              rows: rows,
              columns
            }}
          />
        </Fragment>
      );
    });
  });
};

const ViewDetails = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const { data, from, to, linkFrom, linkTo } = props;
  const odus = _get(data, "odus");

  return (
    <Fragment>
      <Button
        variant="outlined"
        color="primary"
        onClick={openModal}
        className={classes.mainButton}
      >
        View Details
      </Button>
      <Modal
        title={`From Interface Details: ${data.name}`}
        maxWidth="lg"
        open={open}
        handleClose={closeModal}
      >
        <OdusTable
          odus={odus}
          data={data}
          from={from}
          to={to}
          classes={classes}
          linkFrom={linkFrom}
          linkTo={linkTo}
        />
      </Modal>
    </Fragment>
  );
};

export default ViewDetails;
