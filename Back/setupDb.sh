#!/bin/bash

### create service 
### create action
### create trigger

service_number=0
action_number=0
trigger_number=0

link="http://localhost:8080/"
bearertoken="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJAZ21haWwuY29tIiwiaWQiOiIyMzkwZmFjOC0yOTNmLTQ5OTUtOWQ3Zi0yN2I4MWU1NWJmOGQiLCJpYXQiOjE2OTY2OTY0MTB9.aMYI4dXOjTGSDtSH98KcQHxLnlU62SiLPAuMAn95vAg" 

### Service

curl -X GET ${link}actrig/deleteall -H "Authorization: Bearer ${bearertoken}"
printf "\n"

while IFS= read -r service; do
    curl -X POST ${link}actrig/addservice \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${bearertoken}" \
    -d "${service}"
    printf "\n"
    service_number=$((service_number+1))
done < <(jq -c '.[]' ./setup/services.json)

while IFS= read -r action; do
    curl -X POST ${link}actrig/addaction \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${bearertoken}" \
    -d "${action}"
    printf "\n"
    action_number=$((action_number+1))
done < <(jq -c '.[]' ./setup/actions.json)

while IFS= read -r trigger; do
    curl -X POST ${link}actrig/addtrigger \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${bearertoken}" \
    -d "${trigger}"
    printf "\n"
    trigger_number=$((trigger_number+1))
done < <(jq -c '.[]' ./setup/triggers.json)

echo "Services: ${service_number} | Actions: ${action_number} | Triggers: ${trigger_number}"
echo "Total Trigger\Action: $((action_number+trigger_number))"
