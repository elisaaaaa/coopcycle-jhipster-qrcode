package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.HashSet;
import java.util.Set;

/**
 * A Course.
 */
@Entity
@Table(name = "course")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Course implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "i_dcourse", nullable = false)
    private Integer iDcourse;

    @NotNull
    @Column(name = "iddelveryman", nullable = false)
    private Integer iddelveryman;

    @OneToMany(mappedBy = "course")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Order> orders = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "courses", allowSetters = true)
    private DeliveryMan deliveryMan;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getiDcourse() {
        return iDcourse;
    }

    public Course iDcourse(Integer iDcourse) {
        this.iDcourse = iDcourse;
        return this;
    }

    public void setiDcourse(Integer iDcourse) {
        this.iDcourse = iDcourse;
    }

    public Integer getIddelveryman() {
        return iddelveryman;
    }

    public Course iddelveryman(Integer iddelveryman) {
        this.iddelveryman = iddelveryman;
        return this;
    }

    public void setIddelveryman(Integer iddelveryman) {
        this.iddelveryman = iddelveryman;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public Course orders(Set<Order> orders) {
        this.orders = orders;
        return this;
    }

    public Course addOrder(Order order) {
        this.orders.add(order);
        order.setCourse(this);
        return this;
    }

    public Course removeOrder(Order order) {
        this.orders.remove(order);
        order.setCourse(null);
        return this;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public DeliveryMan getDeliveryMan() {
        return deliveryMan;
    }

    public Course deliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
        return this;
    }

    public void setDeliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Course)) {
            return false;
        }
        return id != null && id.equals(((Course) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Course{" +
            "id=" + getId() +
            ", iDcourse=" + getiDcourse() +
            ", iddelveryman=" + getIddelveryman() +
            "}";
    }
}
