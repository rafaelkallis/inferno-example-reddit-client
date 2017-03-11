
import { Provider } from 'inferno-redux';
import configureStore from '../configureStore';
import Layout from '../components/Layout';
import SubredditPicker from './SubredditPicker';
import Posts from './Posts';
import MoreButton from './MoreButton';

const store = configureStore();

export default function App () {
    return (
        <Provider store={store}>
            <Layout>
                <SubredditPicker options={['javascript', 'reactjs']} />
                <Posts />
                <MoreButton />
            </Layout>
        </Provider>
    );
}