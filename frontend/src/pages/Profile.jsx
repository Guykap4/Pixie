import React from 'react'
import { connect } from 'react-redux';
import { EntityList } from '../cmps/profile/EntityList.jsx'

class _Profile extends React.Component {
    state = {
        entitiesType: 'All',
        entities: null,
        draftsAmount: 0,
        websitesAmount: 0,
    }

    async componentDidMount() {
        // const { userId } = this.props.match.params;
        const entities = await this.getEntities();
        this.setState({ entities })
        this.getEntitiesAmount();
    }

    changeEntitiesType = (entitiesType) => {
        this.setState({ entitiesType })
    }

    getEntities = () => {
        return Promise.resolve(this.demoData)
    }

    getEntitiesForDisplay(entitiesType) {
        let { entities } = this.state
        if (entitiesType !== 'All') {
            const isPublished = entitiesType === 'Websites';
            entities = entities.filter(entity => entity.isPublished === isPublished);
        }
        return entities;
    }

    getEntitiesAmount() {
        const {entities} = this.state;
        let draftsAmount = 0;
        let websitesAmount = 0;
        entities.forEach(entity => {
            entity.isPublished ? websitesAmount++ : draftsAmount++;
        })
        this.setState({ ...this.state, draftsAmount, websitesAmount});
    }

    render() {

        const { entitiesType, websitesAmount, draftsAmount } = this.state
        const { userId } = this.props.match.params;

        return (
            <section className="profile-container">
                <div className="profile-sidebar">
                    <div className="user-img"></div>
                    <div className="statistics">
                        <div><span className="amount">{websitesAmount}</span><span className="stat">Websites</span></div>
                        <div><span className="amount">{draftsAmount}</span><span className="stat">Drafts</span></div>
                    </div>
                    <div className="side-nav">
                        <div className={entitiesType === 'All' ? 'active' : ''} onClick={() => this.changeEntitiesType('All')}>All</div>
                        <div className={entitiesType === 'Websites' ? 'active' : ''} onClick={() => this.changeEntitiesType('Websites')}>Websites</div>
                        <div className={entitiesType === 'Drafts' ? 'active' : ''} onClick={() => this.changeEntitiesType('Drafts')}>Drafts</div>
                    </div>
                </div>
                <div className="divider"></div>
                <div className="profile-main">
                    <div className="details">
                        <span className="greet">Hello Puki</span>
                        <span className="last-active">Last activity: 01/01/2021</span>
                    </div>
                    <EntityList entities={this.getEntitiesForDisplay(entitiesType)} entitiesType={entitiesType} />
                </div>
            </section>
        )
    }

    demoData = [
        {
            _id: 'd101',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../../../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd102',
            isPublished: false,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd103',
            isPublished: false,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd104',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd105',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd106',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd107',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd108',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd109',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
        {
            _id: 'd1010',
            isPublished: true,
            createdAt: Date.now(),
            updatedAt: null,
            userId: 'u101',
            previewImg: '../assets/img/default-preview-img.png',
            childs: [],
        },
    ]
}

const mapDispatchToProps = {
}

function mapStateToProps(state) {
    return {
        data: state.dataModule.data,
    }
}

export const Profile = connect(mapStateToProps, mapDispatchToProps)(_Profile)