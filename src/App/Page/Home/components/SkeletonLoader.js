import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import '../index.scss'

const SkeletonLoader = () => {
  return (
        <>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
            <div className="flex loader">
                <Skeleton variant="text" width='80%' height={40}/>
                <Skeleton variant="rectangle" width={120} height={120} />
            </div>
        </>
    )
}

export default SkeletonLoader;