import { UserImageType } from './user-image-type'
import default_image from '../../assets/default-image.png'
import './UserImage.scss'

const UserImage = ({ imageUrl, size = 32 }: UserImageType) => {
  return (
    <div className='user-image' style={{ width: size, height: size }}>
      <img
        src={imageUrl ? imageUrl : default_image}
        className={imageUrl ? undefined : 'user-image-default'}
        alt='user image'
      />
    </div>
  )
}

export default UserImage
