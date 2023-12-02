import { useDispatch, useSelector } from 'react-redux'
import Button from '../buttons/Button'
import { CaretLeft, CaretRight } from '../icons'
import { RootState } from '../../redux/store'
import dayjs from 'dayjs'
import { capitalizeFirstLetter } from 'shared-utils/utils/capitalizeFirstLetter'
import Tooltip from '../tooltip/Tooltip'
import { decreaseMonth, increaseMonth } from '../../redux/slices/monthPickerSlice'

const MonthPicker = () => {
  const selectedDateString = useSelector((state: RootState) => state.monthPicker.selectedDate)
  const selectedDate = dayjs(selectedDateString)

  const dispatch = useDispatch()

  const handlePreviousClick = () => {
    dispatch(decreaseMonth())
  }

  const handleNextClick = () => {
    dispatch(increaseMonth())
  }

  return (
    <div className="flex flex-row items-center gap-4">
      <Tooltip text="Poprzedni miesiąc">
        <Button
          variant="icon-only"
          color="transparent"
          size="small"
          IconLeft={CaretLeft}
          onClick={handlePreviousClick}
        />
      </Tooltip>
      <div className="flex flex-col justify-center items-center w-16">
        <span className="font-bold leading-[18px]">
          {capitalizeFirstLetter(selectedDate.locale('pl').format('MMMM'))}
        </span>
        <span className="text-sm leading-[18px]">
          {capitalizeFirstLetter(selectedDate.locale('pl').format('YYYY'))}
        </span>
      </div>
      <Tooltip text="Kolejny miesiąc">
        <Button
          variant="icon-only"
          color="transparent"
          size="small"
          IconRight={CaretRight}
          onClick={handleNextClick}
        />
      </Tooltip>
    </div>
  )
}

export default MonthPicker
