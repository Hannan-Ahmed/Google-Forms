pipeline {
  agent any

  tools {
    nodejs "nodejs"
  }

  environment {
    NVD_API_KEY = '54e5ec41-047b-4eff-8dce-75459c3aa479'
    DOCKER_IMAGE = 'hannanahmed/react-form-app'
    DOCKER_TAG = 'latest'
  }

  stages {
    stage('Git Checkout') {
      steps {
        git changelog: true, credentialsId: 'minsa-tokens', poll: false, url: 'https://github.com/Hannan-Ahmed/Google-Forms.git'
        sh 'git log -1 --oneline'
      }
    }

    stage('OWASP Dependency-Check Vulnerabilities') {
      steps {
        dependencyCheck additionalArguments: ''' 
          --noupdate
          -o './dependency-check-report' 
          -s './' 
          -f 'ALL' 
          --prettyPrint
        ''', odcInstallation: 'owasp-dc'

        dependencyCheckPublisher pattern: 'dependency-check-report/dependency-check-report.xml'
      }
    }

    stage('SonarQube Analysis') {
      steps {
        withSonarQubeEnv('sonar-server') {
          script {
            def scannerHome = tool name: 'sonar-scanner', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            sh """
              ${scannerHome}/bin/sonar-scanner \
              -Dsonar.projectName=harmonyPlayground-CICD \
              -Dsonar.projectKey=Devops-CICD \
              -Dsonar.sources=.
            """
          }
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build Docker Image') {
      steps {
        script {
          docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        script {
          docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
            docker.image("${DOCKER_IMAGE}:${DOCKER_TAG}").push()
          }
        }
      }
    }

    stage('Deploy to Remote Host') {
      steps {
        script {
          sh 'docker stop harmony-playground || true'
          sh 'docker rm harmony-playground || true'
          sh 'docker run -d --name harmony-playground -p 3000:80 ${DOCKER_IMAGE}:${DOCKER_TAG}'
        }
      }
    }
  }

  post {
    success {
      echo '✅ Build and Deploy Successful!'
    }
    failure {
      echo '❌ Build Failed!'
    }
    always {
      archiveArtifacts artifacts: 'dependency-check-report/*.html', allowEmptyArchive: true
    }
  }
}
