import { ElementsConsumer } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const InjectCheck = () => {
    return (
        <div>
            <ElementsConsumer>
                {({ stripe, elements }) => (
                    <CheckoutForm stripe={stripe} elements={elements} />
                )}
            </ElementsConsumer>
        </div>
    );
};

export default InjectCheck;