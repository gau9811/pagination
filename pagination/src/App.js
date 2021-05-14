import React, { useState, useEffect } from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [values, setValues] = useState([
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    24,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
  ])
  const [pages, setPages] = useState([])

  const [PagesValues, setPagesValues] = useState([])

  useEffect(() => {
    let arr = []
    if (values.length >= 10) {
      for (
        let i = 1;
        i <= parseInt(values.length.toString().split('')[0]);
        i++
      ) {
        if (i != 0) {
          arr.push(i)
        }
      }
    }
    setPages(arr)
  }, [])

  const handleChange = (i) => {
    let finalValues
    if (i == 1) {
      finalValues = values.slice(0, 10)
    } else {
      let start = `${i - 1}0`
      let end = `${i}0`
      finalValues = values.slice(parseInt(start), parseInt(end))
    }

    if (finalValues.length) {
      setPagesValues(finalValues)
    }
  }
  return (
    <div>
      <Pagination aria-label="Page navigation example">
        {values &&
          pages &&
          pages.map((item) => {
            return (
              <PaginationItem>
                <PaginationLink href="#" onClick={() => handleChange(item)}>
                  {item}
                </PaginationLink>
              </PaginationItem>
            )
          })}
      </Pagination>
      {PagesValues &&
        PagesValues.length == 0 &&
        values.slice(0, 10).map((item) => {
          return <p>{item}</p>
        })}

      {PagesValues &&
        PagesValues.length > 0 &&
        PagesValues.map((item) => {
          return <p>{item}</p>
        })}
    </div>
  )
}

export default App
