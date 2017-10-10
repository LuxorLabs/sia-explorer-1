import React from 'react'
import styled from 'styled-components'
import styles from 'styles'
import styledProps from 'styled-props'
import ResponsiveTable from 'react-responsive-tables'
import breakpoints from 'styled-components-breakpoint'

// TODO: Clean this dirty CSS up
export const TableWrap = styled.div`
  font-size: ${styles.fontSize.small}rem;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;  
    width: 100%;
    table-layout: fixed;
    box-shadow: 0 2px 7px 0 rgba(0,0,0,0.10);
    transition: 3s cubic-bezier(0.075, 0.82, 0.165, 1);
    color: ${styles.color.altL2};
  }
  thead {
    tr {
      background: ${styles.color.altD1};
    }
  }
  tbody {
    tr:nth-of-type(even) {
      background:${styles.color.altD2};
    }
  }
  td {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  tr {
    background: ${styles.color.altDark};
  }
  td,
  th {
    border-bottom: 1.5px solid ${styles.color.altL1};
    padding: 1rem 0.5rem;
  }
  th{
    ${breakpoints('lg', styles.breakpoint)`
      border-bottom-width: 3px;
    `}
  }
  tr {
    &:hover {
      background: ${styles.color.altD2};
    }
  }
  tr:last-child {
    td {
      border-bottom: none;
    }
  }
`

const MinerLayout = styled(TableWrap)`
  th:first-child {
    width: 100px;
  }
  th:nth-child(2) {
    width: 600px;
  }
  th:nth-child(3) {
    width: 150px;
  }
`

const BlocksLayout = styled(TableWrap)`
th:first-child {
  width: 100px;
}
th:nth-child(2) {
  width: 550px;
}
th:last-child {
  width: 250px;
}
`

const WorkersLayout = styled(TableWrap)`

`

const TimeStatsLayout = styled(TableWrap)`

`

const SetupRegionLayout = styled(TableWrap)`

`

const PayoutLayout = styled(TableWrap)`
th:first-child {
  width: 100px;
}
th:nth-child(2) {
  width: 200px;
}
th:nth-child(3) {
  width: 550px;
}
`

export const MinersTable = props => (
  <MinerLayout><ResponsiveTable {...props} /></MinerLayout>
)

export const BlocksTable = props => (
  <BlocksLayout><ResponsiveTable {...props} /></BlocksLayout>
)

export const WorkersTable = props => (
  <WorkersLayout><ResponsiveTable {...props} /></WorkersLayout>
)

export const TimeStatsTable = props => (
  <TimeStatsLayout><ResponsiveTable {...props} /></TimeStatsLayout>
)

export const PayoutTable = props => (
  <PayoutLayout><ResponsiveTable {...props} /></PayoutLayout>
)

export const SetupRegionTable = props => (
  <SetupRegionLayout><ResponsiveTable {...props} /></SetupRegionLayout>
)
