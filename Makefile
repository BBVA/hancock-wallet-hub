.PHONY: build-dev dev test coverage shell db-shell-prod docs db-dev db-shell-dev db-init-dev down-dev

YML_DEV=environment/dev/docker-compose.yml
COMPOSE_DEV=docker-compose -f ${YML_DEV}

build-dev:
	${COMPOSE_DEV} build

dev: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports hancock_wallet_hub dev

test: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports hancock_wallet_hub test

coverage: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports hancock_wallet_hub coverage

shell: build-dev down-dev
	${COMPOSE_DEV} run --rm --no-deps hancock_wallet_hub /bin/bash

docs: build-dev down-dev
	${COMPOSE_DEV} run --rm --no-deps hancock_wallet_hub /bin/bash -c "npm run docs"

db-shell-dev: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports mongo-shell

db-shell-prod:
	docker run -it --rm bitnami/mongodb:latest /bin/bash -c "mongo --host mongo.blockchainhub-develop.svc.cluster.local:27017 hancock"

db-init-dev: build-dev down-dev
	${COMPOSE_DEV} run --rm --service-ports mongo-shell /scripts/init_db.js

contract-dev: build-dev down-dev
	${COMPOSE_DEV} run --rm --no-deps --service-ports hancock_wallet_hub node /code/scripts/deploy_contracts.js

down-dev:
	${COMPOSE_DEV} down
