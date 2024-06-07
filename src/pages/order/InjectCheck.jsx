import { ElementsConsumer } from '@stripe/react-stripe-js';
import Checkoutform2 from './Checkoutform2';
import CheckoutForm from './CheckoutForm';

const InjectCheck = ({ clientSecret }) => {
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