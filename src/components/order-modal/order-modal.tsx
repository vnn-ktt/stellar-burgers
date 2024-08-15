import { useParams } from 'react-router-dom';
import { Modal } from '../modal';
import { OrderInfo } from '../order-info';

interface OrderModalProps {
  onClose: () => void;
  user?: boolean;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  user = false,
  onClose
}) => {
  const { number } = useParams();
  return (
    <Modal title={`#${number}`} onClose={onClose}>
      <OrderInfo user={user} />
    </Modal>
  );
};
