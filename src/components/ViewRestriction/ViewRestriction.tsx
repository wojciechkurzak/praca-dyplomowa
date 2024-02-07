import { useAppSelector } from '../../redux/hooks'
import { ViewRestrictionProps } from './ViewRestrictionTypes'

import './ViewRestriction.scss'

const ViewRestriction = ({
  children,
  currentProject,
}: ViewRestrictionProps) => {
  const auth = useAppSelector((state) => state.auth)

  return currentProject.leader === auth.email ? (
    children
  ) : (
    <div className='no-permission'>
      <h2>You don't have permission</h2>
    </div>
  )
}

export default ViewRestriction
