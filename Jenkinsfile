pipeline {
  agent {
    docker {
     image 'node:14-buster'
    }
  }
  environment {
    CI = 'false'
    HOME = '.'
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Setup') {
      steps {
         withChecks('Setup') {
            sh 'rm -rf package-lock.json'
            sh  'npm install'
         }
      }
    }
    stage('Build') {

        steps {
            withChecks('Build') {
                sh 'npm run build'
            }
        }


    }
    
    
    stage('Deploy'){
    
    	 parallel {
	    stage('Staging-Deploy') {
	       when {
			branch 'staging'
	       }	
	       steps {
		  withChecks('Staging-Deploy') {
		      echo 'Staging' 
		      withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
		          s3Delete(bucket: 'test-bucket-replica', path:'**/*')
		          s3Upload(bucket: 'test-bucket-replica', workingDir:'build', includePathPattern:'**/*');
			  cfInvalidate(distribution:'E14U5LE27GP068', paths:['/*'], waitForCompletion: true)
		      }
		  }
	       }
	    }

	    stage('Main-Deploy') {
	       when {
			branch 'main'
	       }
	       steps {
		  withChecks('Main-Deploy') {
		      echo 'main'
		      withAWS(region:"us-east-1", credentials: "7c7202fd-9de5-46ce-a20f-991c6eaabf8e") {
		          s3Delete(bucket: 'test-bucket-replica', path:'**/*')
		          s3Upload(bucket: 'test-bucket-replica', workingDir:'build', includePathPattern:'**/*');
			  cfInvalidate(distribution:'E14U5LE27GP068', paths:['/*'], waitForCompletion: true)
		      }
		  }
	       }
	    }
	}	    
    }
  }
}
