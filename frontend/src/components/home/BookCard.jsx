import React from 'react'
import PropTypes from "prop-types"
import {PiBookOpenTextLight} from "react-icons/pi"
import {BiUserCircle} from "react-icons/bi"
import {AiOutlineEdit} from "react-icons/ai"
import {BsInfoCircle} from "react-icons/bs"
import {MdOutlineDelete} from "react-icons/md"
import { Link } from 'react-router-dom'
import BookSingleCard from './BookSingleCard'



const BookCard = ({books}) => {
  return (
    <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

        {books.map((book) => {
            return(
                <BookSingleCard key={book._id} book={book} />
            )
        })}
        

    </div>
  )
}

BookCard.propTypes = {
    books: PropTypes.array.isRequired
}

export default BookCard