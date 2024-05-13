FROM node:18 AS keycloakify_jar_builder

# Install Maven
RUN apt-get update && apt-get install -y maven

COPY package.json yarn.lock /opt/app/

WORKDIR /opt/app

RUN npm install --frozen-lockfile

COPY . /opt/app/

RUN npm run build-keycloak-theme

FROM quay.io/keycloak/keycloak:23.0.3 AS builder 

WORKDIR /opt/keycloak

COPY --from=keycloakify_jar_builder /opt/app/dist_keycloak/target/PAdmin-fgic-keycloak-theme-6.1.7.jar /opt/keycloak/providers/
COPY --from=keycloakify_jar_builder /opt/app/dist_keycloak/src/main/resources/theme/PAdmin-fgic /opt/keycloak/themes/

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:23.0.3

COPY --from=builder /opt/keycloak /opt/keycloak/

ENV KEYCLOAK_ADMIN=admin
ENV KEYCLOAK_ADMIN_PASSWORD=admin

ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]