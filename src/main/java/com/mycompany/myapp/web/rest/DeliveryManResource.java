package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.DeliveryMan;
import com.mycompany.myapp.repository.DeliveryManRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.DeliveryMan}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DeliveryManResource {

    private final Logger log = LoggerFactory.getLogger(DeliveryManResource.class);

    private static final String ENTITY_NAME = "deliveryMan";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DeliveryManRepository deliveryManRepository;

    public DeliveryManResource(DeliveryManRepository deliveryManRepository) {
        this.deliveryManRepository = deliveryManRepository;
    }

    /**
     * {@code POST  /delivery-men} : Create a new deliveryMan.
     *
     * @param deliveryMan the deliveryMan to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new deliveryMan, or with status {@code 400 (Bad Request)} if the deliveryMan has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/delivery-men")
    public ResponseEntity<DeliveryMan> createDeliveryMan(@Valid @RequestBody DeliveryMan deliveryMan) throws URISyntaxException {
        log.debug("REST request to save DeliveryMan : {}", deliveryMan);
        if (deliveryMan.getId() != null) {
            throw new BadRequestAlertException("A new deliveryMan cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DeliveryMan result = deliveryManRepository.save(deliveryMan);
        return ResponseEntity.created(new URI("/api/delivery-men/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /delivery-men} : Updates an existing deliveryMan.
     *
     * @param deliveryMan the deliveryMan to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated deliveryMan,
     * or with status {@code 400 (Bad Request)} if the deliveryMan is not valid,
     * or with status {@code 500 (Internal Server Error)} if the deliveryMan couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/delivery-men")
    public ResponseEntity<DeliveryMan> updateDeliveryMan(@Valid @RequestBody DeliveryMan deliveryMan) throws URISyntaxException {
        log.debug("REST request to update DeliveryMan : {}", deliveryMan);
        if (deliveryMan.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DeliveryMan result = deliveryManRepository.save(deliveryMan);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, deliveryMan.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /delivery-men} : get all the deliveryMen.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of deliveryMen in body.
     */
    @GetMapping("/delivery-men")
    public List<DeliveryMan> getAllDeliveryMen() {
        log.debug("REST request to get all DeliveryMen");
        return deliveryManRepository.findAll();
    }

    /**
     * {@code GET  /delivery-men/:id} : get the "id" deliveryMan.
     *
     * @param id the id of the deliveryMan to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the deliveryMan, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/delivery-men/{id}")
    public ResponseEntity<DeliveryMan> getDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to get DeliveryMan : {}", id);
        Optional<DeliveryMan> deliveryMan = deliveryManRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(deliveryMan);
    }

    /**
     * {@code DELETE  /delivery-men/:id} : delete the "id" deliveryMan.
     *
     * @param id the id of the deliveryMan to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/delivery-men/{id}")
    public ResponseEntity<Void> deleteDeliveryMan(@PathVariable Long id) {
        log.debug("REST request to delete DeliveryMan : {}", id);

        deliveryManRepository.deleteById(id);
    return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
