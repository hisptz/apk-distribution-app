import i18n from '@dhis2/d2-i18n'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'
import {Figure} from '../../components'
import {UploadApkButton} from '../UploadApk'
import styles from './ApkList.module.css'
import {LatestDownloadButton} from './LatestDownloadButton'

export const AboutSection = ({
                                 latest,
                                 updateVersion,
                                 versions,
                                 handleList,
                                 disabled,
                             }) => (
    <section className={classnames(styles.appCardSection, styles.aboutSection)}>
        <div>
            <h2 className={styles.appCardHeading}>{i18n.t('Description')}</h2>
            <div className={styles.appCardParagraph}>
                <p>
                    {i18n.t(
                        "The Tanzania Immunization Registry (TIMR) is a cutting-edge digital system developed using DHIS2, designed to streamline and enhance the management of immunization data across Tanzania. By leveraging the robust capabilities of DHIS2, TIMR ensures the accurate collection, storage, and analysis of immunization-related information, which is vital for effective health service delivery and decision-making."
                    )}
                </p>
                <p>
                    {i18n.t(
                        'This app is fully functional offline enabling health workers in areas where there is limited or no Internet connection, continue with their regular work.'
                    )}
                </p>
            </div>
        </div>

        <div>
            {/*<Figure/>*/}
        </div>

        {!isEmpty(latest) && <LatestDownloadButton apkList={versions}/>}

        {!disabled && (
            <UploadApkButton
                updateVersion={updateVersion}
                versions={versions}
                handleList={handleList}
                latest={latest}
            />
        )}
    </section>
)

AboutSection.propTypes = {
    disabled: PropTypes.bool,
    handleList: PropTypes.func,
    latest: PropTypes.object,
    updateVersion: PropTypes.func,
    versions: PropTypes.array,
}

export const HeaderContent = ({text}) => (
    <section className={classnames(styles.appCardSection)}>
        <div>
            <h2 className={styles.appCardName}>{text}</h2>
        </div>
    </section>
)

HeaderContent.propTypes = {
    text: PropTypes.string,
}
