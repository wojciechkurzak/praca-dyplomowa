import { UserImageProps } from './UserImageTypes'
import default_image from '../../assets/default-image.png'
import './UserImage.scss'

const UserImage = ({ imageUrl, size = 32 }: UserImageProps) => {
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
