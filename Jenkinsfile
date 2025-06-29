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
    deleteDir() // ✅ Wipe the workspace completely (clean start)
    checkout([$class: 'GitSCM',
      branches: [[name: "*/${env.BRANCH_NAME}"]],
      doGenerateSubmoduleConfigurations: false,
      extensions: [],
      submoduleCfg: [],
      userRemoteConfigs: [[
        url: 'https://github.com/Hannan-Ahmed/Google-Forms.git',
        credentialsId: 'minsa-tokens'
      ]]
    ])
    sh 'echo ✅ Checked out branch: ${BRANCH_NAME}'
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

    stage('Deploy via Ansible') {
      steps {
        script {
          def deployEnv = 'develop'
          if (env.BRANCH_NAME == 'master') {
            deployEnv = 'production'
          } else if (env.BRANCH_NAME == 'staging') {
            deployEnv = 'staging'
          }
          echo "🌍 Branch: ${env.BRANCH_NAME} → Deploying to: ${deployEnv}"

          sh """
            cd ansible
            ansible-playbook -i inventory/hosts.ini playbooks/deploy-react.yml -e env=${deployEnv} --private-key=/var/lib/jenkins/.ssh/id_rsa
          """
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