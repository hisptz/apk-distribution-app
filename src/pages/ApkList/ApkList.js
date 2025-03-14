import i18n from '@dhis2/d2-i18n'
import { Card, Divider, CircularLoader } from '@dhis2/ui'
import classnames from 'classnames'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import React, { useState, useEffect } from 'react'
import { useAppContext } from '../../app-context'
import { useIsAuthorized } from '../../auth'
import { useDataStore, useUserGroups } from '../../hooks'
import styles from './ApkList.module.css'
import { getLatestDownloadApk, prepareAPKListTable } from './helper'
import { ListView } from './ListView'
import { ResetValues } from './ResetValues/ResetValues'
import { AboutSection, HeaderContent } from './Sections'
import { VersionList } from './VersionList'

export const ApkList = () => {
    const { userGroups: currentUserGroups } = useAppContext()
    const { hasAuthority } = useIsAuthorized()
    const { loading, latestVersion, versions } = useDataStore()
    const { userGroups } = useUserGroups()
    const [apkList, setList] = useState([])
    const [currentVersion, setVersion] = useState({})
    const [hasAccessLatest, setAccessLatest] = useState()

    useEffect(() => {
        if (!isEmpty(userGroups)) {
            latestVersion && setVersion(latestVersion)
            versions && setList(prepareAPKListTable(versions, userGroups))
        }
    }, [latestVersion, versions, userGroups])

    useEffect(() => {
        if (!isEmpty(apkList)) {
            !isEqual(latestVersion, apkList[0]) && setVersion(apkList[0])
        } else {
            setVersion({})
        }
    }, [apkList])

    useEffect(() => {
        if (!isEmpty(apkList)) {
            const { isInitialDefault } = getLatestDownloadApk(
                apkList,
                currentUserGroups
            )
            setAccessLatest(isInitialDefault)
        }
    }, [apkList, currentVersion])

    return (
        <Card className={styles.appCard}>
            {loading ? (
                <CircularLoader />
            ) : (
                <div className={styles.container}>
                    <HeaderContent text={i18n.t('TimR Mobile App')} />
                    <Divider />
                    <AboutSection
                        latest={currentVersion}
                        updateVersion={setVersion}
                        versions={apkList}
                        handleList={setList}
                        disabled={!hasAuthority}
                    />
                    <ListView
                        hasAuthority={hasAuthority}
                        loading={loading}
                        isInitialDefault={hasAccessLatest}
                    >
                        <>
                            {!isEmpty(apkList) && (
                                <>
                                    <Divider />
                                    <h2
                                        className={classnames(
                                            styles.appCardHeading,
                                            styles.appCardSection
                                        )}
                                    >
                                        {i18n.t(
                                            'All versions of the application'
                                        )}
                                    </h2>
                                    <VersionList
                                        versions={apkList}
                                        handleList={setList}
                                        disabled={!hasAuthority}
                                    />
                                    <ResetValues disabled={!hasAuthority} />
                                </>
                            )}
                        </>
                    </ListView>
                </div>
            )}
        </Card>
    )
}
