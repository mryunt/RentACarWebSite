import React from 'react'
import routes from './routes'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Header from "components/Header/Header"
import Footer from "components/Footer/Footer"

const Index = () => {
    return (
        <Router>
            <Header />
            <Switch>
                {
                    routes.map((page, index) => (
                        <Route
                            key={index}
                            component={page.component}
                            path={page.path}
                        />
                    ))
                }
            </Switch>
            <Footer />
        </Router>
    )
}

export default Index
